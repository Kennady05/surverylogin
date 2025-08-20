<script id="forms/boilerplate.js">
for(const el of formEl.elements){ if(el.name){ rec[el.name]=el.value.trim(); } }
await App.DB.save(FORM_KEY, rec);
alert('Saved');
renderTables();
};
document.getElementById('reset').onclick = ()=> formEl.reset();


async function renderTables(){
const mine = await App.DB.byUser(FORM_KEY, me.username);
const all = await App.DB.list(FORM_KEY);
const tbl = (rows)=>{
if(!rows.length) return '<small>No entries</small>';
const cols = Object.keys(rows[0]);
return `<table><thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>`+
rows.map(r=>`<tr>${cols.map(c=>`<td>${r[c]??''}</td>`).join('')}</tr>`).join('')+`</tbody></table>`;
};
document.getElementById('mine').innerHTML = tbl(mine);
document.getElementById('all').innerHTML = tbl(all);
document.getElementById('adminBlock').hidden = (me.role!=='admin');
}
renderTables();


// CSV
document.getElementById('dlMine').onclick = async ()=>{
const rows = await App.DB.byUser(FORM_KEY, me.username);
App.CSV.dl(App.CSV.from(rows), `${FORM_KEY}-my-entries.csv`);
};
document.getElementById('dlAll').onclick = async ()=>{
const rows = await App.DB.list(FORM_KEY);
App.CSV.dl(App.CSV.from(rows), `${FORM_KEY}-all.csv`);
};
})();
}
</script>
