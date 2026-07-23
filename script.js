// ======================================
// FUTBOL LIVE V2
// Script.js
// ======================================

// API adresi
const WORKER_URL = "https://futbol-live-api.muro-1984-muro.workers.dev";

// Eski skorlar
let eskiSkorlar = {};

// Sayfa açılınca çalıştır
window.addEventListener("load", () => {

    canliMaclar();

    bugunkuMaclar();

    puanDurumu();

    haberleriGetir();

    bildirimSistemi();

});

// Her 60 saniyede yenile
setInterval(() => {

    canliMaclar();

    bugunkuMaclar();

},60000);
// ======================================
// CANLI MAÇLAR
// ======================================

async function canliMaclar(){

    const alan = document.getElementById("liveMatches");

    if(!alan) return;

    alan.innerHTML =
    "<div class='loading'>Canlı maçlar yükleniyor...</div>";

    try{

        const res = await fetch(
        `${WORKER_URL}?endpoint=fixtures&live=all`
        );

        const data = await res.json();

        alan.innerHTML = "";

        if(!data.response || data.response.length===0){

            alan.innerHTML = `
            <div class="match">
            <h3>📺 Şu anda canlı maç yok.</h3>
            </div>
            `;

            return;

        }

        data.response.forEach(mac=>{

            const skor =
            `${mac.goals.home ?? 0}-${mac.goals.away ?? 0}`;

            const dakika =
            mac.fixture.status.elapsed
            ? mac.fixture.status.elapsed+"'"
            : "CANLI";

            alan.innerHTML += `

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

    }

    catch(err){

        alan.innerHTML=`

        <div class="match">

        <h3>❌ Veriler alınamadı.</h3>

        </div>

        `;

        console.log(err);

    }

}
// ======================================
// BUGÜNKÜ MAÇLAR
// ======================================

async function bugunkuMaclar(){

    const alan = document.getElementById("todayMatches");

    if(!alan) return;

    alan.innerHTML =
    "<div class='loading'>Bugünkü maçlar yükleniyor...</div>";

    try{

        const res = await fetch(
        `${WORKER_URL}?endpoint=today`
        );

        const data = await res.json();

        alan.innerHTML = "";

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

    }

    catch{

        alan.innerHTML=`

        <div class="match">

        <h3>⚠️ Bugünkü maçlar alınamadı.</h3>

        </div>

        `;

    }

}
