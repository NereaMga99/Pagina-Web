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

/* Fallback en memoria cuando Brave bloquea todo el storage */
var _memoryStorage = {};

function storageGet(key) {
    if (_memoryStorage[key] !== undefined) return _memoryStorage[key];
    try { var v = localStorage.getItem(key); if (v !== null) return v; } catch (e) {}
    try { var v = sessionStorage.getItem(key); if (v !== null) return v; } catch (e) {}
    return null;
}
function storageSet(key, value) {
    _memoryStorage[key] = value;
    try { localStorage.setItem(key, value); } catch (e) {}
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

    /* Mostrar solo si no hay decisión previa */
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
});

/* --- BOTÓN VOLVER ARRIBA --- */
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btn-top');
    if (!btn) return;

    // Mostrar u ocultar según scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });

    // Acción al pulsar
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});