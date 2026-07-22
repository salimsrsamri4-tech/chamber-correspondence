/* ============ بيانات الهيكل التنظيمي ============ */
const ORG = [
  { id:'s1', name:'مدير عام مركز البحوث والدراسات', depts:[
    { id:'d1', name:'دائرة البحوث والدراسات' },
    { id:'d2', name:'دائرة البيانات والتحليل' },
    { id:'d3', name:'دائرة اللجان القطاعية' },
  ]},
  { id:'s2', name:'مدير عام قطاع العمليات والاستدامة', depts:[
    { id:'d4', name:'دائرة الموارد البشرية والثقافة المؤسسية' },
    { id:'d5', name:'دائرة الشؤون المالية' },
    { id:'d6', name:'دائرة الشؤون الإدارية' },
    { id:'d7', name:'دائرة التقنية والتحول الرقمي' },
  ]},
  { id:'s3', name:'مدير عام قطاع التخطيط والحوكمة', depts:[
    { id:'d8', name:'دائرة المراكز والمكاتب الخارجية' },
    { id:'d9', name:'دائرة الوثائق والمحفوظات' },
    { id:'d10', name:'دائرة التخطيط والأداء المؤسسي' },
    { id:'d11', name:'مكتب رؤية عمان 2040' },
  ]},
  { id:'s4', name:'مدير عام قطاع مجلس الإدارة والتعاون الدولي', depts:[
    { id:'d12', name:'مكتب رئيس المجلس' },
    { id:'d13', name:'أمانة السر' },
    { id:'d14', name:'دائرة التعاون الدولي والعلاقات العامة' },
    { id:'d15', name:'دائرة الإعلام والتواصل المؤسسي' },
  ]},
  { id:'s5', name:'مدير عام قطاع الفروع والأعمال', depts:[
    { id:'d16', name:'دائرة الخدمات الذكية' },
    { id:'d17', name:'دائرة المعارض والفعاليات' },
    { id:'d18', name:'دائرة ريادة الأعمال' },
    { id:'d19', name:'دائرة الفروع', branches:[
      'فرع ظفار','فرع شمال الباطنة','فرع الداخلية','فرع شمال الشرقية','فرع الوسطى',
      'فرع مسندم','فرع جنوب الباطنة','فرع الظاهرة','فرع جنوب الشرقية','فرع البريمي'
    ]},
  ]},
];

const WORKFLOW_STEPS = [
  'استلام المعاملة','تسجيلها','عرضها على الرئيس التنفيذي','قرار الرئيس التنفيذي',
  'إحالة للمدير العام المختص','إحالة للدائرة','تنفيذ المهمة','رفع الرد',
  'اعتماد المدير العام','اعتماد الرئيس التنفيذي','إغلاق المعاملة'
];
const STATUS_BY_STEP = ['جديدة','جديدة','محالة','محالة','محالة','محالة','قيد التنفيذ','بانتظار رد','بانتظار رد','منجزة','مغلقة'];
const STATUSES = ['جديدة','محالة','قيد التنفيذ','بانتظار رد','منجزة','مغلقة'];
const PRIORITIES = ['عاجلة','عالية','عادية'];
const CONFID = ['عادي','سري','سري جداً'];

// من يستطيع تحريك المعاملة من هذه الخطوة إلى التي تليها
const STEP_ADVANCE_ROLE = {
  0:['office'], 1:['office'], 2:['office'], 3:['ceo'], 4:['ceo','office'],
  5:['gm'], 6:['deptHead','staff'], 7:['deptHead'], 8:['gm'], 9:['ceo'], 10:[]
};
const ROLE_LABELS = {
  ceo:'الرئيس التنفيذي', office:'مكتب الرئيس التنفيذي', gm:'المدير العام',
  deptHead:'مدير الدائرة', staff:'الموظف', auditor:'المدقق'
};
const PERMISSIONS = [
  { role:'الرئيس التنفيذي', perms:'الاطلاع الكامل، إصدار التوجيهات، اعتماد وإغلاق المعاملات' },
  { role:'مكتب الرئيس التنفيذي', perms:'تسجيل، إحالة، متابعة، تقارير، تنبيهات' },
  { role:'المدير العام', perms:'الاطلاع على معاملات قطاعه، توزيعها، اعتماد الردود' },
  { role:'مدير الدائرة', perms:'التنفيذ، تحديث الحالة، رفع الرد' },
  { role:'الموظف', perms:'تنفيذ المهام المكلف بها وإرفاق المستندات' },
  { role:'المدقق', perms:'الاطلاع والتدقيق فقط' },
];

const SOURCES = ['وزارة التجارة والصناعة','ديوان البلاط السلطاني','غرفة تجارة وصناعة عُمان - الفروع',
  'شركة عمانتل','بنك مسقط','وزارة المالية','مجلس الشورى','هيئة البيئة','شركة عضو - قطاع صناعي',
  'وزارة العمل','جهة داخلية - قسم المالية','جهة داخلية - قسم الموارد البشرية'];
const SUBJECTS = ['طلب تعميم قرار وزاري جديد','دعوة لحضور مؤتمر اقتصادي','متابعة شكوى عضو منتسب',
  'طلب بيانات إحصائية عن القطاع الصناعي','اعتماد ميزانية فعالية تجارية','تنسيق زيارة رسمية',
  'طلب دعم لفعالية ريادة أعمال','تجديد اتفاقية تعاون دولي','ملاحظات على مشروع لائحة تنظيمية',
  'طلب مقابلة مع الرئيس التنفيذي','تقرير أداء ربع سنوي','استفسار عضو حول رسوم الاشتراك',
  'طلب افتتاح فرع جديد','تحديث بيانات موقع رؤية عمان 2040','دعوة ورشة تدريبية للموارد البشرية'];

/* ============ الحالة (State) ============ */
let DB = { transactions: [] };
let currentView = 'dashboard';
let currentRole = 'office';
let scopeSector = '';
let scopeDept = '';
let editingTrxId = null;

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const todayStr = () => new Date().toISOString().slice(0,10);
const daysBetween = (a,b) => Math.round((new Date(b)-new Date(a))/86400000);

function allDepts(){
  const out = [];
  ORG.forEach(s => s.depts.forEach(d => out.push({sectorId:s.id, sectorName:s.name, deptId:d.id, deptName:d.name, branches:d.branches||null})));
  return out;
}
function sectorById(id){ return ORG.find(s=>s.id===id); }
function deptById(id){ return allDepts().find(d=>d.deptId===id); }

/* ============ الخادم (Google Apps Script) أو التخزين المحلي ============ */
// ضع رابط تطبيق الويب (exec) من Google Apps Script هنا لتفعيل مشاركة البيانات بين كل من يفتح الرابط.
// اتركه فارغاً للعمل بوضع تجريبي محلي (localStorage) بدون خادم مشترك.
const API_URL = 'https://script.google.com/macros/s/AKfycbzSMkR6sGWEy_LeUKSnpfvyf6O6MfLH84qC2g8XYcQGsnYtKw3b6ST03bk0Pzn3pQgC/exec';
function apiEnabled(){ return !!API_URL; }

function apiFetchAll(){
  return fetch(API_URL, {cache:'no-store'}).then(r=>r.json()).then(d=>d.transactions || []);
}
function apiPost(action, data){
  return fetch(API_URL, {
    method:'POST',
    headers:{'Content-Type':'text/plain;charset=utf-8'}, // يتجنب طلب preflight من Apps Script
    body: JSON.stringify(Object.assign({action}, data)),
  }).catch(e=>{ console.error('apiPost failed', e); });
}

const STORAGE_KEY = 'correspondence_platform_db_v1';
function saveDB(){ if(!apiEnabled()) localStorage.setItem(STORAGE_KEY, JSON.stringify(DB)); }
function loadDB(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw){ try{ DB = JSON.parse(raw); return true; }catch(e){} }
  return false;
}

/* ============ توليد بيانات تجريبية ============ */
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function randDateWithin(daysBack, daysFwd){
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random()*(daysBack+daysFwd) - daysBack));
  return d.toISOString().slice(0,10);
}
function seedData(){
  DB.transactions = [];
  const depts = allDepts();
  let n = 1;
  const stepWeights = [3,2,2,2,3,3,4,4,6,9,11];
  const stepPool = stepWeights.flatMap((w,idx)=>Array(w).fill(idx));
  for(let i=0;i<42;i++){
    const d = rand(depts);
    const priority = rand(PRIORITIES);
    const step = rand(stepPool);
    const createdDate = randDateWithin(step>=9 ? 25 : 16, 0);
    const due = new Date(createdDate);
    due.setDate(due.getDate() + (priority==='عاجلة'?7:priority==='عالية'?12:18) + Math.floor(Math.random()*8));
    const createdAt = new Date(createdDate).getTime();
    const history = [{step:0, at: createdAt}];
    let t = createdAt;
    for(let s=1;s<=step;s++){
      t += (1+Math.floor(Math.random()*3))*86400000;
      history.push({step:s, at: t});
    }
    // لا نسمح بتواريخ إجراءات في المستقبل: نُعيد توزيع الفارق الزمني بالتناسب ليقع بين الاستلام والآن
    const now = Date.now();
    if(history.length>1 && history[history.length-1].at > now){
      const span = Math.max(1, now - createdAt);
      const rawSpan = history[history.length-1].at - createdAt;
      for(let k=1;k<history.length;k++){
        history[k].at = createdAt + Math.round((history[k].at-createdAt) * span/rawSpan);
      }
    }
    const branch = d.branches ? rand(d.branches) : null;
    DB.transactions.push({
      id: 'TRX-' + String(n++).padStart(4,'0'),
      date: createdDate,
      source: Math.random()>0.45 ? 'خارجية' : 'داخلية',
      sourceName: rand(SOURCES),
      subject: rand(SUBJECTS),
      priority,
      confidentiality: rand(CONFID),
      sectorId: d.sectorId,
      deptId: d.deptId,
      branch,
      dueDate: due.toISOString().slice(0,10),
      step,
      attachments: Math.random()>0.4 ? [rand(['خطاب.pdf','مرفق.docx','عرض.pdf','بيانات.xlsx'])] : [],
      createdAt,
      history,
    });
  }
  saveDB();
}

/* ============ اشتقاقات ============ */
function statusOf(trx){ return STATUS_BY_STEP[trx.step]; }
function isOverdue(trx){ return trx.step<9 && trx.dueDate < todayStr(); }
function isSoon(trx){ return trx.step<9 && !isOverdue(trx) && daysBetween(todayStr(), trx.dueDate) <= 3 && daysBetween(todayStr(), trx.dueDate) >= 0; }
function lastUpdateAt(trx){ return trx.history[trx.history.length-1].at; }

function visibleTransactions(){
  let list = DB.transactions;
  if(currentRole==='gm' && scopeSector) list = list.filter(t=>t.sectorId===scopeSector);
  if((currentRole==='deptHead'||currentRole==='staff') && scopeDept) list = list.filter(t=>t.deptId===scopeDept);
  return list;
}

/* ============ عرض/تنقل ============ */
const VIEW_META = {
  dashboard:['لوحة التحكم الرئيسية للرئيس التنفيذي','نظرة شاملة على أداء المراسلات والمهام'],
  transactions:['تصنيف وتسجيل المراسلات','تسجيل كل معاملة بحقولها الكاملة ومتابعتها'],
  orgchart:['ربط الهيكل التنظيمي','القطاعات والدوائر والفروع المرتبطة بالمعاملات'],
  workflow:['دورة العمل (Workflow)','من الاستلام إلى الإغلاق عبر 11 خطوة'],
  managers:['شاشة متابعة المديرين العموم','صفحة مستقلة لكل مدير عام'],
  daily:['المتابعة اليومية لمكتب الرئيس التنفيذي','قائمة يومية مع تلوين الحالة'],
  alerts:['التنبيهات','تنبيهات تلقائية حسب أحداث المعاملات'],
  reports:['التقارير','استخراج تقارير متنوعة قابلة للتصدير والطباعة'],
  permissions:['الصلاحيات','مصفوفة صلاحيات المستخدمين'],
  kpis:['مؤشرات الأداء (KPIs)','تُحسب تلقائياً لكل مدير عام ودائرة وفرع'],
};

function setView(view){
  currentView = view;
  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view===view));
  $$('.view').forEach(v => v.classList.toggle('active', v.id==='view-'+view));
  $('#viewTitle').textContent = VIEW_META[view][0];
  $('#viewSubtitle').textContent = VIEW_META[view][1];
  renderView(view);
}

function renderView(view){
  if(view==='dashboard') renderDashboard();
  else if(view==='transactions') renderTransactions();
  else if(view==='orgchart') renderOrgChart();
  else if(view==='workflow') renderWorkflow();
  else if(view==='managers') renderManagers();
  else if(view==='daily') renderDaily();
  else if(view==='alerts') renderAlerts();
  else if(view==='reports') renderReports();
  else if(view==='permissions') renderPermissions();
  else if(view==='kpis') renderKpis();
}

/* ============ 1. لوحة التحكم ============ */
function renderDashboard(){
  const list = visibleTransactions();
  const incoming = list.filter(t=>t.source==='خارجية').length;
  const outgoing = list.filter(t=>t.source==='داخلية').length;
  const inProgress = list.filter(t=>statusOf(t)==='قيد التنفيذ').length;
  const late = list.filter(isOverdue).length;
  const done = list.filter(t=>t.step>=9).length;

  const stats = [
    {label:'إجمالي المراسلات الواردة', num: incoming, cls:'c-blue'},
    {label:'إجمالي المراسلات الصادرة', num: outgoing, cls:'c-gold'},
    {label:'عدد المعاملات قيد التنفيذ', num: inProgress, cls:'c-amber'},
    {label:'المعاملات المتأخرة', num: late, cls:'c-red'},
    {label:'المعاملات المنجزة', num: done, cls:'c-green'},
  ];
  $('#statGrid').innerHTML = stats.map(s=>`
    <div class="stat-card ${s.cls}"><div class="num">${s.num}</div><div class="label">${s.label}</div></div>
  `).join('');

  // توزيع حسب المدير العام
  $('#chartBySector').innerHTML = ORG.map(s=>{
    const count = list.filter(t=>t.sectorId===s.id).length;
    const max = Math.max(1, ...ORG.map(x=>list.filter(t=>t.sectorId===x.id).length));
    return barRow(s.name, count, max);
  }).join('');

  // نسبة الإنجاز لكل قطاع
  $('#chartCompletion').innerHTML = ORG.map(s=>{
    const sList = list.filter(t=>t.sectorId===s.id);
    const pct = sList.length ? Math.round(sList.filter(t=>t.step>=9).length/sList.length*100) : 0;
    return barRow(s.name, pct, 100, '%');
  }).join('');

  // القرارات المتأخرة (خطوة قرار الرئيس التنفيذي متأخرة عن SLA فرضي 5 أيام)
  const overdueDecisions = list.filter(t => t.step===2 && daysBetween(t.date, todayStr()) > 5);
  $('#overdueDecisionsTable thead').innerHTML = '<tr><th>رقم المعاملة</th><th>الموضوع</th><th>تاريخ الاستلام</th><th>عدد أيام الانتظار</th></tr>';
  $('#overdueDecisionsTable tbody').innerHTML = overdueDecisions.length ? overdueDecisions.map(t=>`
    <tr><td>${t.id}</td><td>${t.subject}</td><td>${t.date}</td><td>${daysBetween(t.date, todayStr())}</td></tr>
  `).join('') : `<tr><td colspan="4" class="muted">لا توجد قرارات متجاوزة للمدة المحددة حالياً</td></tr>`;
}

function barRow(label, val, max, suffix=''){
  const pct = Math.min(100, Math.round(val/max*100));
  return `<div class="bar-row">
    <span class="bar-label">${label}</span>
    <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    <span class="bar-val">${val}${suffix}</span>
  </div>`;
}

/* ============ 2. تصنيف وتسجيل المراسلات ============ */
function populateFilterSelects(){
  $('#filterStatus').innerHTML = '<option value="">كل الحالات</option>' + STATUSES.map(s=>`<option value="${s}">${s}</option>`).join('');
  $('#filterSector').innerHTML = '<option value="">كل القطاعات</option>' + ORG.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  $('#filterPriority').innerHTML = '<option value="">كل الأولويات</option>' + PRIORITIES.map(p=>`<option value="${p}">${p}</option>`).join('');
}

function renderTransactions(){
  const q = ($('#trxSearch').value||'').trim();
  const fStatus = $('#filterStatus').value;
  const fSector = $('#filterSector').value;
  const fPriority = $('#filterPriority').value;

  let list = visibleTransactions().slice().sort((a,b)=>b.createdAt-a.createdAt);
  if(q) list = list.filter(t => t.subject.includes(q) || t.id.includes(q));
  if(fStatus) list = list.filter(t => statusOf(t)===fStatus);
  if(fSector) list = list.filter(t => t.sectorId===fSector);
  if(fPriority) list = list.filter(t => t.priority===fPriority);

  const canAdd = ['ceo','office'].includes(currentRole);
  $('#addTrxBtn').disabled = !canAdd;
  $('#addTrxBtn').title = canAdd ? '' : 'هذا الدور لا يملك صلاحية تسجيل معاملة جديدة';

  $('#trxTable tbody').innerHTML = list.map(t=>{
    const dept = deptById(t.deptId);
    return `<tr data-id="${t.id}">
      <td><strong>${t.id}</strong></td>
      <td>${t.date}</td>
      <td>${t.source}${t.branch ? ' · '+t.branch : ''}</td>
      <td>${t.subject}</td>
      <td><span class="chip priority-${t.priority}">${t.priority}</span></td>
      <td><span class="chip conf-${t.confidentiality.replace(' ','-')}">${t.confidentiality}</span></td>
      <td>${sectorById(t.sectorId).name.replace('مدير عام ','')}</td>
      <td>${dept ? dept.deptName : ''}</td>
      <td class="${isOverdue(t)?'':''}" style="${isOverdue(t)?'color:var(--red);font-weight:700':''}">${t.dueDate}</td>
      <td><span class="chip ${statusOf(t).replace(/ /g,'-')}">${statusOf(t)}</span></td>
      <td><button class="btn small" data-open="${t.id}">فتح</button></td>
    </tr>`;
  }).join('') || `<tr><td colspan="11" class="muted">لا توجد معاملات مطابقة</td></tr>`;
}

/* نموذج إضافة/تفاصيل معاملة */
function openTrxModal(id){
  editingTrxId = id || null;
  const trx = id ? DB.transactions.find(t=>t.id===id) : null;
  $('#modalTitle').textContent = trx ? `المعاملة ${trx.id}` : 'تسجيل معاملة جديدة';

  if(!trx){
    $('#modalBody').innerHTML = trxFormHtml();
    bindSectorDeptSelects('#f-sector', '#f-dept', '#f-branchWrap', '#f-branch');
    $('#modalBackdrop').classList.add('show');
    return;
  }

  const dept = deptById(trx.deptId);
  const canEditStatus = STEP_ADVANCE_ROLE[trx.step]?.includes(currentRole) || currentRole==='ceo';
  const nextStepLabel = trx.step<10 ? WORKFLOW_STEPS[trx.step+1] : null;

  $('#modalBody').innerHTML = `
    <div class="form-grid">
      <div class="form-field"><label>رقم المعاملة</label><input value="${trx.id}" disabled></div>
      <div class="form-field"><label>التاريخ</label><input value="${trx.date}" disabled></div>
      <div class="form-field"><label>الجهة الواردة</label><input value="${trx.source} — ${trx.sourceName}" disabled></div>
      <div class="form-field"><label>الأولوية</label><input value="${trx.priority}" disabled></div>
      <div class="form-field"><label>السرية</label><input value="${trx.confidentiality}" disabled></div>
      <div class="form-field"><label>تاريخ الإنجاز المطلوب</label><input value="${trx.dueDate}" disabled></div>
      <div class="form-field full"><label>الموضوع</label><input value="${trx.subject}" disabled></div>
      <div class="form-field"><label>المدير العام المختص</label><input value="${sectorById(trx.sectorId).name}" disabled></div>
      <div class="form-field"><label>الدائرة المختصة</label><input value="${dept?dept.deptName:''}${trx.branch?' — '+trx.branch:''}" disabled></div>
      <div class="form-field full"><label>المرفقات</label><input value="${trx.attachments.join('، ') || 'بدون مرفقات'}" disabled></div>
    </div>

    <h4 style="margin:18px 0 6px;font-size:13.5px">دورة العمل</h4>
    <div class="stepper">
      ${WORKFLOW_STEPS.map((label,i)=>`
        <div class="step-item ${i<trx.step?'done':i===trx.step?'current':''}">
          <div class="s-dot">${i<trx.step?'✓':i+1}</div>
          <div class="step-label">${label}</div>
        </div>`).join('')}
    </div>

    ${trx.step<10 ? `
      <div class="perm-note">
        الخطوة القادمة: <strong>${nextStepLabel}</strong> — الصلاحية المطلوبة:
        ${(STEP_ADVANCE_ROLE[trx.step]||[]).map(r=>ROLE_LABELS[r]).join(' أو ') || '—'}
      </div>
      <div class="form-actions">
        <button class="btn danger" id="closeTrxBtn" ${currentRole!=='ceo'?'disabled':''}>إغلاق المعاملة مباشرة</button>
        <button class="btn primary" id="advanceStepBtn" ${canEditStatus?'':'disabled'}>تنفيذ الخطوة التالية ←</button>
      </div>` : `<div class="perm-note">تم إغلاق هذه المعاملة.</div>`}

    <div class="history-log">
      <strong>سجل الإجراءات:</strong>
      ${trx.history.map(h=>`<div>${new Date(h.at).toLocaleString('ar-OM')} — ${WORKFLOW_STEPS[h.step]}</div>`).join('')}
    </div>
  `;

  $('#advanceStepBtn')?.addEventListener('click', ()=>{
    trx.step = Math.min(10, trx.step+1);
    trx.history.push({step:trx.step, at: Date.now()});
    saveDB();
    if(apiEnabled()) apiPost('advance', {id: trx.id, step: trx.step, history: trx.history});
    openTrxModal(trx.id);
    renderView(currentView);
  });
  $('#closeTrxBtn')?.addEventListener('click', ()=>{
    trx.step = 10;
    trx.history.push({step:10, at: Date.now()});
    saveDB();
    if(apiEnabled()) apiPost('advance', {id: trx.id, step: trx.step, history: trx.history});
    openTrxModal(trx.id);
    renderView(currentView);
  });

  $('#modalBackdrop').classList.add('show');
}

function trxFormHtml(){
  return `
    <div class="form-grid">
      <div class="form-field"><label>الجهة الواردة</label>
        <select id="f-source"><option value="خارجية">خارجية</option><option value="داخلية">داخلية</option></select>
      </div>
      <div class="form-field"><label>اسم الجهة / المُرسل</label><input id="f-sourceName" placeholder="مثال: وزارة التجارة والصناعة"></div>
      <div class="form-field full"><label>موضوع المعاملة</label><input id="f-subject" placeholder="عنوان المعاملة"></div>
      <div class="form-field"><label>الأولوية</label>
        <select id="f-priority">${PRIORITIES.map(p=>`<option value="${p}">${p}</option>`).join('')}</select>
      </div>
      <div class="form-field"><label>السرية</label>
        <select id="f-confidentiality">${CONFID.map(c=>`<option value="${c}">${c}</option>`).join('')}</select>
      </div>
      <div class="form-field"><label>المدير العام المختص</label>
        <select id="f-sector">${ORG.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select>
      </div>
      <div class="form-field"><label>الدائرة المختصة</label><select id="f-dept"></select></div>
      <div class="form-field full" id="f-branchWrap" style="display:none">
        <label>الفرع</label><select id="f-branch"></select>
      </div>
      <div class="form-field"><label>تاريخ الإنجاز المطلوب</label><input type="date" id="f-dueDate"></div>
      <div class="form-field full"><label>المرفقات (اسم الملف فقط للتجربة)</label><input id="f-attach" placeholder="مثال: خطاب.pdf"></div>
    </div>
    <div class="form-actions">
      <button class="btn" id="cancelTrxBtn">إلغاء</button>
      <button class="btn primary" id="saveTrxBtn">حفظ المعاملة</button>
    </div>
  `;
}

function bindSectorDeptSelects(sectorSel, deptSel, branchWrapSel, branchSel){
  const fillDepts = () => {
    const sid = $(sectorSel).value;
    const s = sectorById(sid);
    $(deptSel).innerHTML = s.depts.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');
    fillBranches();
  };
  const fillBranches = () => {
    const did = $(deptSel).value;
    const d = deptById(did);
    if(d && d.branches){
      $(branchWrapSel).style.display='';
      $(branchSel).innerHTML = d.branches.map(b=>`<option value="${b}">${b}</option>`).join('');
    } else {
      $(branchWrapSel).style.display='none';
    }
  };
  $(sectorSel).addEventListener('change', fillDepts);
  $(deptSel).addEventListener('change', fillBranches);
  fillDepts();
}

function closeModal(){ $('#modalBackdrop').classList.remove('show'); editingTrxId=null; }
function closeSidebar(){ $('.sidebar').classList.remove('open'); $('#sidebarBackdrop').classList.remove('show'); }

/* ============ 3. الهيكل التنظيمي ============ */
function renderOrgChart(){
  const list = DB.transactions;
  $('#orgTree').innerHTML = ORG.map(s=>{
    const sCount = list.filter(t=>t.sectorId===s.id).length;
    return `<div class="org-sector" data-sector="${s.id}">
      <div class="org-sector-head"><span>${s.name}</span><span class="count">${sCount} معاملة</span></div>
      <div class="org-depts">
        ${s.depts.map(d=>{
          const dCount = list.filter(t=>t.deptId===d.id).length;
          return `<div class="org-dept"><span>${d.name}</span><span class="muted">${dCount} معاملة</span></div>
            ${d.branches ? `<div class="org-branches">${d.branches.map(b=>`<span class="org-branch-tag">${b}</span>`).join('')}</div>` : ''}`;
        }).join('')}
      </div>
    </div>`;
  }).join('');

  $$('.org-sector-head').forEach(h => h.addEventListener('click', ()=>{
    h.closest('.org-sector').classList.toggle('open');
  }));
}

/* ============ 4. دورة العمل (Kanban) ============ */
function renderWorkflow(){
  $('#workflowLegend').innerHTML = WORKFLOW_STEPS.map((s,i)=>`<span>${i+1}. ${s}</span>`).join('');
  const list = visibleTransactions();
  $('#kanbanBoard').innerHTML = STATUSES.map(status=>{
    const items = list.filter(t=>statusOf(t)===status);
    return `<div class="kanban-col">
      <h4><span>${status}</span><span>${items.length}</span></h4>
      ${items.map(t=>`
        <div class="kanban-card" data-open="${t.id}">
          <span class="kc-id">${t.id}</span>
          <span class="kc-sub">${t.subject}</span>
          <div class="kc-tags">
            <span class="chip priority-${t.priority}">${t.priority}</span>
            ${isOverdue(t) ? '<span class="chip منجزة" style="background:var(--red)">متأخرة</span>' : ''}
          </div>
        </div>`).join('') || '<div class="muted" style="font-size:11.5px">لا توجد معاملات</div>'}
    </div>`;
  }).join('');
}

/* ============ 5. متابعة المديرين العموم ============ */
let activeManagerSector = 's1';
function renderManagers(){
  $('#managerTabs').innerHTML = ORG.map(s=>`
    <button class="tab-btn ${s.id===activeManagerSector?'active':''}" data-sector-tab="${s.id}">${s.name}</button>
  `).join('');
  $$('[data-sector-tab]').forEach(b=>b.addEventListener('click',()=>{ activeManagerSector=b.dataset.sectorTab; renderManagers(); }));
  renderManagerPanel(activeManagerSector);
}
function renderManagerPanel(sectorId){
  const s = sectorById(sectorId);
  const list = DB.transactions.filter(t=>t.sectorId===sectorId);
  const news = list.filter(t=>t.step<=1).length;
  const inProg = list.filter(t=>statusOf(t)==='قيد التنفيذ').length;
  const late = list.filter(isOverdue).length;
  const pct = list.length ? Math.round(list.filter(t=>t.step>=9).length/list.length*100) : 0;
  const durations = list.filter(t=>t.step>=9).map(t=>daysBetween(t.date, new Date(lastUpdateAt(t)).toISOString().slice(0,10)));
  const avgDur = durations.length ? Math.round(durations.reduce((a,b)=>a+b,0)/durations.length) : 0;
  const topSubjects = Object.entries(list.reduce((acc,t)=>{acc[t.subject]=(acc[t.subject]||0)+1;return acc;},{}))
    .sort((a,b)=>b[1]-a[1]).slice(0,5);

  $('#managerPanel').innerHTML = `
    <div class="stat-grid small">
      <div class="stat-card c-blue"><div class="num">${list.length}</div><div class="label">إجمالي المعاملات</div></div>
      <div class="stat-card c-gold"><div class="num">${news}</div><div class="label">معاملات جديدة</div></div>
      <div class="stat-card c-amber"><div class="num">${inProg}</div><div class="label">قيد التنفيذ</div></div>
      <div class="stat-card c-red"><div class="num">${late}</div><div class="label">متأخرة</div></div>
      <div class="stat-card c-green"><div class="num">${pct}%</div><div class="label">نسبة الإنجاز</div></div>
      <div class="stat-card"><div class="num">${avgDur}</div><div class="label">متوسط أيام الإنجاز</div></div>
    </div>
    <div class="card">
      <h3>الدوائر التابعة لـ${s.name}</h3>
      <div class="bars">
        ${s.depts.map(d=>{
          const dList = list.filter(t=>t.deptId===d.id);
          const dPct = dList.length ? Math.round(dList.filter(t=>t.step>=9).length/dList.length*100) : 0;
          return barRow(d.name, dPct, 100, '%');
        }).join('')}
      </div>
    </div>
    <div class="card">
      <h3>أهم المواضيع</h3>
      <div class="bars">
        ${topSubjects.map(([subj,count])=>barRow(subj, count, Math.max(1,topSubjects[0][1]))).join('') || '<span class="muted">لا توجد بيانات</span>'}
      </div>
    </div>
  `;
}

/* ============ 6. المتابعة اليومية ============ */
function renderDaily(){
  const list = visibleTransactions().filter(t=>t.step<10).slice().sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
  $('#dailyTable tbody').innerHTML = list.map(t=>{
    const dept = deptById(t.deptId);
    let dotClass = 'progress', label = statusOf(t);
    if(t.step>=9){ dotClass='done'; }
    else if(isOverdue(t)){ dotClass='late'; label='متأخر'; }
    else if(isSoon(t)){ dotClass='soon'; label='يقرب موعد الإنجاز'; }
    return `<tr>
      <td>${t.subject}</td>
      <td>${t.source==='خارجية'?t.sourceName:(dept?dept.deptName:'')}</td>
      <td>${dept?dept.deptName:''}${t.branch?' — '+t.branch:''}</td>
      <td>${t.dueDate}</td>
      <td><i class="dot ${dotClass}"></i> ${label}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="5" class="muted">لا توجد معاملات مفتوحة</td></tr>`;
}

/* ============ 7. التنبيهات ============ */
function renderAlerts(){
  const list = visibleTransactions();
  const alerts = [];
  list.forEach(t=>{
    const last = t.history[t.history.length-1];
    if(last.step>0 && Date.now()-last.at < 3*86400000){
      const kind = last.step===10?'done': (last.step>=4 && last.step<=5?'info':'info');
      let text = '';
      if([4,5].includes(last.step)) text = `تمت إحالة المعاملة ${t.id} — ${t.subject}`;
      else if(last.step===7) text = `تم رفع الرد على المعاملة ${t.id} — ${t.subject}`;
      else if(last.step===9) text = `اعتمد الرئيس التنفيذي المعاملة ${t.id} — ${t.subject}`;
      else if(last.step===10) text = `تم إغلاق المعاملة ${t.id} — ${t.subject}`;
      else text = `تحديث على المعاملة ${t.id}: ${WORKFLOW_STEPS[last.step]}`;
      alerts.push({ kind: last.step===10?'done':'info', text, at:last.at });
    }
    if(isOverdue(t)) alerts.push({kind:'late', text:`المعاملة ${t.id} متأخرة عن موعد الإنجاز (${t.dueDate}) — ${t.subject}`, at: new Date(t.dueDate).getTime()});
    else if(isSoon(t)) alerts.push({kind:'soon', text:`يقرب موعد إنجاز المعاملة ${t.id} خلال ${daysBetween(todayStr(),t.dueDate)} يوم — ${t.subject}`, at: new Date(t.dueDate).getTime()});
  });
  alerts.sort((a,b)=>b.at-a.at);

  const icon = {late:'⚠', soon:'⏰', info:'✉', done:'✓'};
  $('#alertsList').innerHTML = alerts.slice(0,60).map(a=>`
    <div class="alert-item ${a.kind}">
      <span class="a-icon">${icon[a.kind]}</span>
      <span>${a.text}</span>
      <span class="a-time">${new Date(a.at).toLocaleDateString('ar-OM')}</span>
    </div>
  `).join('') || `<div class="muted">لا توجد تنبيهات حالياً</div>`;
}

/* ============ 8. التقارير ============ */
function populateReportGmFilter(){
  $('#reportGmFilter').innerHTML = ORG.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
}
function renderReports(){
  const type = $('#reportType').value;
  $('#reportGmFilter').style.display = type==='monthlyGm' ? '' : 'none';
  const list = DB.transactions;
  let headers = [], rows = [], summary = [];

  const groupCount = (items, keyFn) => {
    const map = {};
    items.forEach(t=>{ const k=keyFn(t); map[k]=(map[k]||0)+1; });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]);
  };

  if(type==='weeklyCeo'){
    const weekList = list.filter(t=> daysBetween(t.date, todayStr()) <= 7);
    headers = ['رقم المعاملة','الموضوع','القطاع','الأولوية','الحالة','تاريخ الإنجاز'];
    rows = weekList.map(t=>[t.id,t.subject,sectorById(t.sectorId).name,t.priority,statusOf(t),t.dueDate]);
    summary = [['معاملات هذا الأسبوع', weekList.length],['متأخرة', weekList.filter(isOverdue).length],['منجزة', weekList.filter(t=>t.step>=9).length]];
  }
  else if(type==='monthlyGm'){
    const sid = $('#reportGmFilter').value || ORG[0].id;
    const gList = list.filter(t=>t.sectorId===sid && daysBetween(t.date, todayStr())<=30);
    headers = ['رقم المعاملة','الموضوع','الدائرة','الحالة','تاريخ الإنجاز'];
    rows = gList.map(t=>{ const d=deptById(t.deptId); return [t.id,t.subject,d?d.deptName:'',statusOf(t),t.dueDate]; });
    summary = [['إجمالي الشهر', gList.length],['منجزة', gList.filter(t=>t.step>=9).length],['متأخرة', gList.filter(isOverdue).length]];
  }
  else if(type==='deptPerf'){
    headers = ['الدائرة','القطاع','إجمالي','منجزة','متأخرة','نسبة الإنجاز'];
    rows = allDepts().map(d=>{
      const dList = list.filter(t=>t.deptId===d.deptId);
      const done = dList.filter(t=>t.step>=9).length;
      const late = dList.filter(isOverdue).length;
      const pct = dList.length ? Math.round(done/dList.length*100)+'%' : '—';
      return [d.deptName, d.sectorName, dList.length, done, late, pct];
    });
  }
  else if(type==='branchPerf'){
    const branchDept = allDepts().find(d=>d.branches);
    headers = ['الفرع','إجمالي','منجزة','متأخرة','نسبة الإنجاز'];
    rows = (branchDept?.branches||[]).map(b=>{
      const bList = list.filter(t=>t.branch===b);
      const done = bList.filter(t=>t.step>=9).length;
      const late = bList.filter(isOverdue).length;
      const pct = bList.length ? Math.round(done/bList.length*100)+'%' : '—';
      return [b, bList.length, done, late, pct];
    });
  }
  else if(type==='overdue'){
    const lateList = list.filter(isOverdue);
    headers = ['رقم المعاملة','الموضوع','القطاع','الدائرة','تاريخ الإنجاز','عدد أيام التأخير'];
    rows = lateList.map(t=>{ const d=deptById(t.deptId); return [t.id,t.subject,sectorById(t.sectorId).name,d?d.deptName:'',t.dueDate, daysBetween(t.dueDate, todayStr())]; });
    summary = [['إجمالي المتأخرة', lateList.length]];
  }
  else if(type==='bySubject'){
    headers = ['الموضوع','عدد المعاملات'];
    rows = groupCount(list, t=>t.subject);
  }
  else if(type==='bySource'){
    headers = ['الجهة الواردة','عدد المعاملات'];
    rows = groupCount(list, t=>t.sourceName);
  }
  else if(type==='byPriority'){
    headers = ['الأولوية','عدد المعاملات'];
    rows = groupCount(list, t=>t.priority);
  }
  else if(type==='byConfidentiality'){
    headers = ['مستوى السرية','عدد المعاملات'];
    rows = groupCount(list, t=>t.confidentiality);
  }

  $('#reportSummary').innerHTML = summary.map(([label,num])=>`
    <div class="stat-card c-blue"><div class="num">${num}</div><div class="label">${label}</div></div>
  `).join('');
  $('#reportTable thead').innerHTML = '<tr>'+headers.map(h=>`<th>${h}</th>`).join('')+'</tr>';
  $('#reportTable tbody').innerHTML = rows.length ? rows.map(r=>'<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('')
    : `<tr><td colspan="${headers.length}" class="muted">لا توجد بيانات</td></tr>`;

  $('#reportTable').dataset.headers = JSON.stringify(headers);
  $('#reportTable').dataset.rows = JSON.stringify(rows);
}

function exportReportCsv(){
  const headers = JSON.parse($('#reportTable').dataset.headers || '[]');
  const rows = JSON.parse($('#reportTable').dataset.rows || '[]');
  const csv = [headers.join(','), ...rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(','))].join('\n');
  const blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'تقرير.csv';
  a.click();
}

/* ============ 9. الصلاحيات ============ */
function renderPermissions(){
  $('#permTable tbody').innerHTML = PERMISSIONS.map(p=>`
    <tr class="${ROLE_LABELS[currentRole]===p.role?'active-role':''}" style="${ROLE_LABELS[currentRole]===p.role?'background:#fff8e6':''}">
      <td>${p.role}${ROLE_LABELS[currentRole]===p.role?' (الدور الحالي)':''}</td>
      <td>${p.perms}</td>
    </tr>
  `).join('');
}

/* ============ 10. مؤشرات الأداء ============ */
function renderKpis(){
  const list = visibleTransactions();
  const total = list.length;
  const onTime = list.filter(t=>t.step>=9).filter(t=> !isOverdue(t)).length;
  const doneCount = list.filter(t=>t.step>=9).length;
  const lateCount = list.filter(isOverdue).length;
  const urgentCount = list.filter(t=>t.priority==='عاجلة').length;
  const durations = list.filter(t=>t.step>=9).map(t=>daysBetween(t.date, new Date(lastUpdateAt(t)).toISOString().slice(0,10)));
  const avgDur = durations.length ? Math.round(durations.reduce((a,b)=>a+b,0)/durations.length) : 0;
  const onTimePct = total ? Math.round(onTime/total*100) : 0;

  $('#kpiGrid').innerHTML = [
    {label:'نسبة الالتزام بالمواعيد', num: onTimePct+'%', cls:'c-green'},
    {label:'متوسط زمن إنجاز المعاملة (يوم)', num: avgDur, cls:'c-blue'},
    {label:'عدد المعاملات المنجزة', num: doneCount, cls:'c-gold'},
    {label:'عدد المعاملات المتأخرة', num: lateCount, cls:'c-red'},
    {label:'عدد المعاملات العاجلة', num: urgentCount, cls:'c-orange'},
  ].map(s=>`<div class="stat-card ${s.cls}"><div class="num">${s.num}</div><div class="label">${s.label}</div></div>`).join('');

  $('#kpiBySector').innerHTML = ORG.map(s=>{
    const sList = DB.transactions.filter(t=>t.sectorId===s.id);
    const pct = sList.length ? Math.round(sList.filter(t=>t.step>=9).length/sList.length*100) : 0;
    return barRow(s.name, pct, 100, '%');
  }).join('');

  const branchDept = allDepts().find(d=>d.branches);
  $('#kpiByBranch').innerHTML = (branchDept?.branches||[]).map(b=>{
    const bList = DB.transactions.filter(t=>t.branch===b);
    const pct = bList.length ? Math.round(bList.filter(t=>t.step>=9).length/bList.length*100) : 0;
    return barRow(b, pct, 100, '%');
  }).join('');

  $('#kpiTable thead').innerHTML = '<tr><th>المدير العام / الدائرة</th><th>إجمالي</th><th>منجزة</th><th>متأخرة</th><th>نسبة الإنجاز</th></tr>';
  $('#kpiTable tbody').innerHTML = allDepts().map(d=>{
    const dList = DB.transactions.filter(t=>t.deptId===d.deptId);
    const done = dList.filter(t=>t.step>=9).length;
    const late = dList.filter(isOverdue).length;
    const pct = dList.length ? Math.round(done/dList.length*100)+'%' : '—';
    return `<tr><td>${d.deptName}</td><td>${dList.length}</td><td>${done}</td><td>${late}</td><td>${pct}</td></tr>`;
  }).join('');
}

/* ============ عناصر تحكم عامة (الدور/النطاق) ============ */
function refreshScopeSelectors(){
  const role = currentRole;
  const needSector = role==='gm';
  const needDept = role==='deptHead' || role==='staff';
  $('#sectorScopeWrap').style.display = (needSector||needDept) ? '' : 'none';
  $('#deptScopeWrap').style.display = needDept ? '' : 'none';

  if(needSector || needDept){
    $('#sectorScope').innerHTML = ORG.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
    if(!scopeSector) scopeSector = ORG[0].id;
    $('#sectorScope').value = scopeSector;
  }
  if(needDept){
    const s = sectorById($('#sectorScope').value || ORG[0].id);
    $('#deptScope').innerHTML = s.depts.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');
    if(!scopeDept || !s.depts.find(d=>d.id===scopeDept)) scopeDept = s.depts[0].id;
    $('#deptScope').value = scopeDept;
  }
}

/* ============ ربط الأحداث ============ */
function bindEvents(){
  $$('.nav-item').forEach(btn => btn.addEventListener('click', ()=>{
    setView(btn.dataset.view);
    closeSidebar();
  }));

  $('#hamburgerBtn').addEventListener('click', ()=>{
    $('.sidebar').classList.toggle('open');
    $('#sidebarBackdrop').classList.toggle('show');
  });
  $('#sidebarBackdrop').addEventListener('click', closeSidebar);

  $('#roleSelect').addEventListener('change', e=>{
    currentRole = e.target.value;
    refreshScopeSelectors();
    renderView(currentView);
  });
  $('#sectorScope').addEventListener('change', e=>{
    scopeSector = e.target.value; scopeDept='';
    refreshScopeSelectors();
    renderView(currentView);
  });
  $('#deptScope').addEventListener('change', e=>{
    scopeDept = e.target.value;
    renderView(currentView);
  });

  $('#resetDataBtn').addEventListener('click', ()=>{
    if(confirm('سيتم استرجاع البيانات التجريبية الأصلية وحذف أي تعديلات محلية. متابعة؟')){
      seedData();
      renderView(currentView);
    }
  });
  $('#refreshServerBtn')?.addEventListener('click', ()=> refreshFromServer(true));

  // Transactions view
  $('#addTrxBtn').addEventListener('click', ()=>{ if(!$('#addTrxBtn').disabled) openTrxModal(null); });
  $('#trxSearch').addEventListener('input', renderTransactions);
  $('#filterStatus').addEventListener('change', renderTransactions);
  $('#filterSector').addEventListener('change', renderTransactions);
  $('#filterPriority').addEventListener('change', renderTransactions);
  $('#trxTable').addEventListener('click', e=>{
    const btn = e.target.closest('[data-open]');
    if(btn) openTrxModal(btn.dataset.open);
  });
  $('#kanbanBoard').addEventListener('click', e=>{
    const card = e.target.closest('[data-open]');
    if(card) openTrxModal(card.dataset.open);
  });

  // Modal
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalBackdrop').addEventListener('click', e=>{ if(e.target.id==='modalBackdrop') closeModal(); });
  $('#modalBody').addEventListener('click', e=>{
    if(e.target.id==='cancelTrxBtn') closeModal();
    if(e.target.id==='saveTrxBtn'){
      const sectorId = $('#f-sector').value;
      const deptId = $('#f-dept').value;
      const dept = deptById(deptId);
      const subject = $('#f-subject').value.trim();
      const dueDate = $('#f-dueDate').value;
      if(!subject || !dueDate){ alert('يرجى تعبئة الموضوع وتاريخ الإنجاز المطلوب'); return; }
      const id = 'TRX-' + String(Date.now()).slice(-8);
      const now = Date.now();
      const newTrx = {
        id, date: todayStr(), source: $('#f-source').value, sourceName: $('#f-sourceName').value.trim() || 'غير محدد',
        subject, priority: $('#f-priority').value, confidentiality: $('#f-confidentiality').value,
        sectorId, deptId, branch: dept.branches ? $('#f-branch').value : null,
        dueDate, step: 1, attachments: $('#f-attach').value.trim() ? [$('#f-attach').value.trim()] : [],
        createdAt: now, history: [{step:0, at:now},{step:1, at:now}],
      };
      DB.transactions.unshift(newTrx);
      saveDB();
      if(apiEnabled()) apiPost('create', {transaction: newTrx});
      closeModal();
      renderView(currentView);
    }
  });

  // Reports
  $('#reportType').addEventListener('change', renderReports);
  $('#reportGmFilter').addEventListener('change', renderReports);
  $('#exportCsvBtn').addEventListener('click', exportReportCsv);
  $('#printReportBtn').addEventListener('click', ()=>{
    $('#view-reports').classList.add('printing');
    window.print();
    setTimeout(()=>$('#view-reports').classList.remove('printing'), 500);
  });
}

/* ============ المزامنة مع الخادم ============ */
function refreshFromServer(manual){
  if(!apiEnabled()) return;
  const btn = $('#refreshServerBtn');
  if(manual && btn) btn.textContent = '⟳ يتم التحديث...';
  apiFetchAll().then(list=>{
    DB.transactions = list;
    renderView(currentView);
  }).catch(()=>{
    if(manual) alert('تعذر الاتصال بالخادم. تحقق من الاتصال بالإنترنت أو من رابط الخادم.');
  }).finally(()=>{
    if(manual && btn) btn.textContent = '⟳ تحديث من الخادم';
  });
}

/* ============ تهيئة ============ */
function init(){
  populateFilterSelects();
  populateReportGmFilter();
  $('#todayPill').textContent = 'اليوم: ' + new Date().toLocaleDateString('ar-OM', {year:'numeric',month:'long',day:'numeric'});
  bindEvents();
  refreshScopeSelectors();

  $('#resetDataBtn').style.display = apiEnabled() ? 'none' : '';
  $('#refreshServerBtn').style.display = apiEnabled() ? '' : 'none';
  $('#serverModeBadge').style.display = apiEnabled() ? '' : 'none';
  $('#localModeBadge').style.display = apiEnabled() ? 'none' : '';

  if(apiEnabled()){
    apiFetchAll()
      .then(list=>{ DB.transactions = list; })
      .catch(()=>{ alert('تعذر الاتصال بالخادم عند التحميل الأول. سيتم استخدام بيانات تجريبية محلية مؤقتاً.'); seedData(); })
      .finally(()=>{ setView('dashboard'); });
    setInterval(()=>refreshFromServer(false), 25000);
  } else {
    if(!loadDB() || !DB.transactions?.length) seedData();
    setView('dashboard');
  }
}

document.addEventListener('DOMContentLoaded', init);
