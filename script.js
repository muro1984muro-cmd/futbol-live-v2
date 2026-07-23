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

const alan = document.getElementById("liveMatches");

if(!alan) return;


alan.innerHTML =
"<div class='loading'>Canlı maçlar yükleniyor...</div>";


try{

const res = await fetch(
`${WORKER_URL}?endpoint=fixtures`
);


const data = await res.json();


alan.innerHTML = "";


if(!data.response || data.response.length === 0){

alan.innerHTML = `

<div class="match-card">

<h3>
📺 Şu anda canlı maç yok.
</h3>

</div>

`;

return;

}


data.response.forEach(mac=>{


alan.innerHTML += `

<div class="match-card">

<div class="league">

🏆 ${mac.league.name}

</div>


<div class="live-time">

🔴 ${mac.fixture.status.elapsed || ""}'

</div>


<div class="teams">

<div class="team">

<img src="${mac.teams.home.logo}" class="team-logo">

<span>${mac.teams.home.name}</span>

</div>


<div class="score">

${mac.goals.home ?? 0}

-

${mac.goals.away ?? 0}

</div>


<div class="team">

<img src="${mac.teams.away.logo}" class="team-logo">

<span>${mac.teams.away.name}</span>

</div>


</div>

</div>

`;

});


}catch(error){

console.log(error);

alan.innerHTML = `

<div class="match-card">

❌ Veriler alınamadı.

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

<div class="match-card">

<div class="league">

🏆 ${mac.league.name}

</div>


<h3>

${mac.teams.home.name}

🆚

${mac.teams.away.name}

</h3>


<p>

🕒 ${
new Date(mac.fixture.date)
.toLocaleTimeString("tr-TR",
{
hour:"2-digit",
minute:"2-digit"
})
}

</p>


</div>

<h3>

${mac.teams.home.name}

🆚

${mac.teams.away.name}

</h3>

<p>

🕒 ${
new Date(mac.fixture.date)
.toLocaleTimeString("tr-TR",
{
hour:"2-digit",
minute:"2-digit"
})
}

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
// ===================================
// BİLDİRİM SİSTEMİ
// ===================================

function bildirimHazirla(){

const buton =
document.getElementById("bildirimAc");

if(!buton) return;

buton.onclick = async()=>{

const izin =
await Notification.requestPermission();

if(izin==="granted"){

new Notification("⚽ Futbol Live",{

body:"Bildirimler başarıyla açıldı.",

icon:"logo.png"

});

}else{

alert("Bildirim izni verilmedi.");

}

};

}
// ===================================
// GOL KONTROLÜ
// ===================================

function golKontrol(mac){

const id = mac.fixture.id;

const skor =
`${mac.goals.home ?? 0}-${mac.goals.away ?? 0}`;

if(
eskiSkorlar[id] &&
eskiSkorlar[id] !== skor &&
Notification.permission==="granted"
){

new Notification("🥅 GOL!",{

body:
`${mac.teams.home.name} ${skor} ${mac.teams.away.name}`,

icon:"logo.png"

});

}

eskiSkorlar[id]=skor;

}
// ===================================
// HABERLER
// ===================================

async function haberler(){

const alan =
document.getElementById("news");

if(!alan) return;

alan.innerHTML = `

<div class="news">

📰 Haberler yükleniyor...

</div>

`;

try{

const res =
await fetch(
`${WORKER_URL}?endpoint=news`
);

const data =
await res.json();

alan.innerHTML = "";

if(!data.response || data.response.length===0){

alan.innerHTML = `

<div class="news">

Henüz haber bulunamadı.

</div>

`;

return;

}

data.response.forEach(haber=>{

alan.innerHTML += `

<div class="news">

<h3>${haber.title}</h3>

<p>${haber.description}</p>

</div>

`;

});

}catch{

alan.innerHTML = `

<div class="news">

Haberler alınamadı.

</div>

`;

}

}
