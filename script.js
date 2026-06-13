/* analytics.js — Gestión de cookies y Google Analytics */

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

/* Carga Google Analytics solo si el usuario aceptó */
function loadAnalytics() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CSSZGRB6CC';
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', 'G-CSSZGRB6CC');
}

/* Lectura/escritura de storage compatible con Brave */
function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) {}
    try { return sessionStorage.getItem(key); } catch (e) {}
    return null;
}
function storageSet(key, value) {
    try { localStorage.setItem(key, value); return; } catch (e) {}
    try { sessionStorage.setItem(key, value); } catch (e) {}
}

/* Al cargar la página: activar Analytics si ya aceptó */
(function () {
    if (storageGet('cookiesDecision') === 'accepted') {
        loadAnalytics();
    }
})();

/* Gestión del banner de cookies (solo en páginas que lo tengan) */
document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('cookie-overlay');
    if (!overlay) return; // Si la página no tiene banner, salir

    if (!storageGet('cookiesDecision')) {
        overlay.style.display = 'flex';
    }

    var acceptBtn = document.getElementById('accept-cookies');
    var rejectBtn = document.getElementById('reject-cookies');

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
            storageSet('cookiesDecision', 'accepted');
            overlay.style.display = 'none';
            loadAnalytics();
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', function () {
            storageSet('cookiesDecision', 'rejected');
            overlay.style.display = 'none';
        });
    }
});