<script type="module" id="assets/app.js">
export const App = (()=>{
const DB = {
_k(form){ return `db:${form}`; },
async list(form){ return JSON.parse(localStorage.getItem(this._k(form))||'[]'); },
async byUser(form, user){ const rows = await this.list(form); return rows.filter(r=>r.__user===user); },
async save(form, rec){ const rows = await this.list(form); if(!rec.__id) rec.__id=crypto.randomUUID(); const i=rows.findIndex(r=>r.__id===rec.__id); if(i===-1) rows.push(rec); else rows[i]=rec; localStorage.setItem(this._k(form), JSON.stringify(rows)); return rec; }
};


const CSV = {
esc(v){ if(v==null) return ''; const s=String(v).replaceAll('"','""'); return /[",
]/.test(s)?`"${s}"`:s; },
from(rows){ if(!rows.length) return ''; const cols=[...rows.reduce((s,r)=>{Object.keys(r).forEach(k=>s.add(k));return s;}, new Set())]; const head=cols.join(','); const body=rows.map(r=>cols.map(c=>CSV.esc(r[c])).join(',')).join('
'); return head+'
'+body; },
dl(csv, name){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download=name; a.click(); }
};


return { DB, CSV };
})();
window.App = App;
</script>
