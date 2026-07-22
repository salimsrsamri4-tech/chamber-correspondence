/**
 * خلفية Google Apps Script لمنصة إدارة المراسلات والمهام والمتابعة.
 * يخزّن كل معاملة كصف في ورقة "Transactions" ضمن جدول Google Sheets المرتبط بهذا المشروع.
 *
 * طريقة الاستخدام:
 * 1) أنشئ جدول بيانات Google Sheets جديد.
 * 2) من القائمة: الإضافات > Apps Script، وامسح المحتوى الافتراضي، وألصق هذا الملف بالكامل.
 * 3) اضغط نشر (Deploy) > نشر جديد (New deployment) > نوع التطبيق: تطبيق ويب (Web app).
 *    - التنفيذ باسم (Execute as): أنا (Me)
 *    - من يمكنه الوصول (Who has access): أي شخص (Anyone)
 * 4) انسخ رابط تطبيق الويب (exec URL) وضعه في app.js داخل ثابت API_URL.
 */

const SHEET_NAME = 'Transactions';
const HEADERS = [
  'id','date','source','sourceName','subject','priority','confidentiality',
  'sectorId','deptId','branch','dueDate','step','attachments','createdAt','history'
];

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function rowToTrx(row) {
  return {
    id: row[0],
    date: row[1],
    source: row[2],
    sourceName: row[3],
    subject: row[4],
    priority: row[5],
    confidentiality: row[6],
    sectorId: row[7],
    deptId: row[8],
    branch: row[9] || null,
    dueDate: row[10],
    step: Number(row[11]),
    attachments: row[12] ? String(row[12]).split('|').filter(Boolean) : [],
    createdAt: Number(row[13]),
    history: row[14] ? JSON.parse(row[14]) : [],
  };
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1).filter(function (r) { return r[0]; });
  const transactions = rows.map(rowToTrx);
  return jsonOut({ transactions: transactions });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getSheet();

    if (payload.action === 'create') {
      const t = payload.transaction;
      sheet.appendRow([
        t.id, t.date, t.source, t.sourceName, t.subject, t.priority, t.confidentiality,
        t.sectorId, t.deptId, t.branch || '', t.dueDate, t.step,
        (t.attachments || []).join('|'), t.createdAt, JSON.stringify(t.history || []),
      ]);
      return jsonOut({ ok: true });
    }

    if (payload.action === 'advance') {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === payload.id) {
          sheet.getRange(i + 1, 12).setValue(payload.step);   // عمود step
          sheet.getRange(i + 1, 15).setValue(JSON.stringify(payload.history)); // عمود history
          break;
        }
      }
      return jsonOut({ ok: true });
    }

    return jsonOut({ ok: false, error: 'إجراء غير معروف' });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
