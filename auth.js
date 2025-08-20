<script type="module" id="assets/auth.js">
export const Auth = (()=>{
const USERS_KEY = 'auth:users';
const SESSION_KEY = 'auth:session';


function readUsers(){ return JSON.parse(localStorage.getItem(USERS_KEY)||'[]'); }
function writeUsers(v){ localStorage.setItem(USERS_KEY, JSON.stringify(v)); }
function seed(){ const list=readUsers(); if(!list.find(u=>u.username==='admin')){ list.push({username:'admin',password:'admin@123',role:'admin'}); writeUsers(list);} }


async function init(){ seed(); }
async function currentUser(){ return JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null'); }
async function signIn(username,password){
const u = readUsers().find(u=>u.username===username && u.password===password);
if(!u) throw new Error('Invalid credentials');
const sess = { username:u.username, role:u.role };
sessionStorage.setItem(SESSION_KEY, JSON.stringify(sess));
return sess;
}
async function signOut(){ sessionStorage.removeItem(SESSION_KEY); }
return { init,currentUser,signIn,signOut };
})();
window.Auth = Auth;
</script>
