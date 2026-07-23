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
