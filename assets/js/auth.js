/* Portail des institutions – authentification de démonstration (côté navigateur uniquement).
   Pour la production, remplacer par une authentification serveur. */
(function () {
  var ACCOUNTS = [
    { user: 'mariem.ahmed@institution.mr', pass: 'Portail@2026', name: 'Mariem Mint Ahmed' }
  ];
  var KEY = 'ige-portail-session';
  function read() {
    try { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function isAuth() { return !!read(); }
  function check(u, p) {
    u = String(u || '').trim().toLowerCase(); p = String(p || '');
    for (var i = 0; i < ACCOUNTS.length; i++) if (ACCOUNTS[i].user === u && ACCOUNTS[i].pass === p) return ACCOUNTS[i];
    return null;
  }
  function login(acc, remember) {
    try {
      var v = JSON.stringify({ user: acc.user, name: acc.name, at: Date.now() });
      sessionStorage.setItem(KEY, v);
      if (remember) localStorage.setItem(KEY, v);
    } catch (e) {}
  }
  function logout() {
    try { sessionStorage.removeItem(KEY); localStorage.removeItem(KEY); } catch (e) {}
  }
  window.IGE_AUTH = { check: check, login: login, logout: logout, isAuth: isAuth };

  if (document.documentElement.hasAttribute('data-protected') && !isAuth()) {
    location.replace('connexion.html');
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var label = (a.getAttribute('aria-label') || a.textContent || '').trim();
    if (label === 'Se déconnecter') logout();
  }, true);
})();
