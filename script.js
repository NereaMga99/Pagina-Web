/* analytics.js — Gestión de cookies y Google Analytics */

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

/* Carga Google Analytics solo si el usuario aceptó */
function loadAnalytics() {
    try {
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CSSZGRB6CC';
        document.head.appendChild(s);
        gtag('js', new Date());
        gtag('config', 'G-CSSZGRB6CC');
    } catch (e) {}
}

/* Fallback en memoria cuando Brave bloquea todo el storage */
var _memoryStorage = {};

function storageGet(key) {
    try {
        if (_memoryStorage[key] !== undefined) return _memoryStorage[key];
    } catch (e) {}
    try {
        var v1 = localStorage.getItem(key);
        if (v1 !== null) return v1;
    } catch (e) {}
    try {
        var v2 = sessionStorage.getItem(key);
        if (v2 !== null) return v2;
    } catch (e) {}
    return null;
}

function storageSet(key, value) {
    try { _memoryStorage[key] = value; } catch (e) {}
    try { localStorage.setItem(key, value); } catch (e) {}
    try { sessionStorage.setItem(key, value); } catch (e) {}
}

/* Todo se ejecuta cuando el DOM está listo */
document.addEventListener('DOMContentLoaded', function () {

    /* Activar Analytics si ya aceptó en visita anterior */
    try {
        if (storageGet('cookiesDecision') === 'accepted') {
            loadAnalytics();
        }
    } catch (e) {}

    /* --- BANNER DE COOKIES --- */
    try {
        var overlay = document.getElementById('cookie-overlay');
        if (overlay) {
            if (storageGet('cookiesDecision') === null) {
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
        }
    } catch (e) {}

    /* --- BOTÓN VOLVER ARRIBA --- */
    try {
        var btn = document.getElementById('btn-top');
        if (btn) {
            window.addEventListener('scroll', function () {
                btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
            });
            btn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } catch (e) {}

});