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
