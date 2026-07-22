/**
 * خلفية Google Apps Script لمنصة إدارة المراسلات والمهام والمتابعة.
 * كل معاملة تُخزَّن كصف واحد بعمودين فقط (id, data) في ورقة "Transactions" —
 * العمود data يحوي كامل بيانات المعاملة كنص JSON، لتجنّب تحويل Google Sheets
 * التلقائي والمُخرِّب لأي قيمة تُشبه تاريخاً أو رقماً.
 *
 * طريقة الاستخدام:
 * 1) أنشئ جدول بيانات Google Sheets جديد.
 * 2) من القائمة: الإضافات > Apps Script، وامسح المحتوى الافتراضي، وألصق هذا الملف بالكامل.
 * 3) اضغط نشر (Deploy) > نشر جديد (New deployment) > نوع التطبيق: تطبيق ويب (Web app).
 *    - التنفيذ باسم (Execute as): أنا (Me)
 *    - من يمكنه الوصول (Who has access): أي شخص (Anyone)
 * 4) انسخ رابط تطبيق الويب (exec URL) وضعه في app.js داخل ثابت API_URL.
 *
 * لتحديث كود منشور سابقاً: Deploy > Manage deployments > ✏️ > Version: New version > Deploy
 * (هذا يحافظ على نفس رابط /exec).
 */

const SHEET_NAME = 'Transactions';
const HEADERS = ['id', 'data'];

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  // نتجاهل فقط صف العناوين الحقيقي (id = 'id')، وليس أول صف بيانات دائماً —
  // هذا يجعل القراءة صحيحة سواء كانت الورقة تحتوي صف عناوين أو لا.
  const rows = data.filter(function (r) { return r[0] && r[0] !== 'id' && r[1]; });
  const transactions = rows.map(function (r) { return JSON.parse(r[1]); });
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
      sheet.getRange(sheet.getLastRow() + 1, 1, 1, 2).setValues([[t.id, JSON.stringify(t)]]);
      return jsonOut({ ok: true });
    }

    if (payload.action === 'advance') {
      const data = sheet.getDataRange().getValues();
      for (let i = 0; i < data.length; i++) {
        if (data[i][0] === payload.id) {
          const t = JSON.parse(data[i][1]);
          t.step = payload.step;
          t.history = payload.history;
          sheet.getRange(i + 1, 2).setValue(JSON.stringify(t));
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
