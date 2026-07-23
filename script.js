// ===================================
// FUTBOL LIVE V2
// Script.js
// ===================================

const WORKER_URL =
"https://futbol-live-api.muro-1984-muro.workers.dev";

let eskiSkorlar = {};

window.onload = () => {

    canliMaclar();

    bugunkuMaclar();

    puanDurumu();

    haberler();

    bildirimHazirla();

};

// 60 saniyede bir yenile

setInterval(() => {

    canliMaclar();

    bugunkuMaclar();

},60000);
// ===================================
// CANLI MAÇLAR
// ===================================

async function canliMaclar(){

const alan =
document.getElementById("liveMatches");

if(!alan) return;

alan.innerHTML=
"<div class='loading'>Canlı maçlar yükleniyor...</div>";

try{

const res =
await fetch(
`${WORKER_URL}?endpoint=fixtures`
);

const data =
await res.json();

alan.innerHTML="";

if(!data.response ||
data.response.length===0){

alan.innerHTML=`

<div class="match">

<h3>

📺 Şu anda canlı maç yok.

</h3>

</div>

`;

return;

}

data.response.forEach(mac=>{

const skor=
`${mac.goals.home ?? 0}-${mac.goals.away ?? 0}`;

const dakika=
mac.fixture.status.elapsed
? mac.fixture.status.elapsed+"'"
: "CANLI";

alan.innerHTML+=`

<div class="match">

<span class="live">

🔴 ${dakika}

</span>

<h3>

${mac.teams.home.name}

🆚

${mac.teams.away.name}

</h3>

<p>

⚽ ${skor}

</p>

</div>

`;

});

}catch{

alan.innerHTML=`

<div class="match">

<h3>

❌ Veriler alınamadı.

</h3>

</div>

`;

}

}
// ===================================
// BUGÜNKÜ MAÇLAR
// ===================================

async function bugunkuMaclar(){

const alan =
document.getElementById("todayMatches");

if(!alan) return;

alan.innerHTML =
"<div class='loading'>Bugünkü maçlar yükleniyor...</div>";

try{

const res =
await fetch(
`${WORKER_URL}?endpoint=today`
);

const data =
await res.json();

alan.innerHTML="";

if(!data.response || data.response.length===0){

alan.innerHTML=`

<div class="match">

<h3>📅 Bugün maç bulunamadı.</h3>

</div>

`;

return;

}

data.response.forEach(mac=>{

alan.innerHTML +=`

<div class="match">

<h3>

${mac.teams.home.name}

🆚

${mac.teams.away.name}

</h3>

<p>

🕒 ${mac.time}

</p>

</div>

`;

});

}catch{

alan.innerHTML=`

<div class="match">

<h3>⚠️ Maçlar alınamadı.</h3>

</div>

`;

}

}
// ===================================
// PUAN DURUMU
// ===================================

async function puanDurumu(){

const tablo =
document.getElementById("puan");

if(!tablo) return;

tablo.innerHTML=`

<tr>

<td colspan="3">

Yükleniyor...

</td>

</tr>

`;

try{

const res =
await fetch(
`${WORKER_URL}?endpoint=standings`
);

const data =
await res.json();

tablo.innerHTML="";

if(!data.response){

tablo.innerHTML=`

<tr>

<td colspan="3">

Veri bulunamadı.

</td>

</tr>

`;

return;

}

data.response.forEach((takim,index)=>{

tablo.innerHTML +=`

<tr>

<td>${index+1}</td>

<td>${takim.name}</td>

<td>${takim.points}</td>

</tr>

`;

});

}catch{

tablo.innerHTML=`

<tr>

<td colspan="3">

Puan durumu yüklenemedi.

</td>

</tr>

`;

}

}
