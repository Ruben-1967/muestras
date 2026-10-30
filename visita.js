// Avisa a Multidigital cuando alguien abre esta demo (tras 5 s con la página a la vista).
// Para que tus propias visitas no cuenten, abre una vez cualquier demo con #yo al final del link.
(function () {
  try {
    if (location.hash === '#yo') localStorage.setItem('md_yo', '1');
    if (localStorage.getItem('md_yo')) return;
  } catch (e) {}
  var slug = location.pathname.split('/').pop().replace(/\.html$/i, '');
  if (!slug) return;
  var visibles = 0, enviado = false;
  var reloj = setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    if (++visibles < 5 || enviado) return;
    enviado = true;
    clearInterval(reloj);
    fetch('https://agendabot-backend-bbw5.onrender.com/visitas-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: slug, dispositivo: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'celular' : 'computador' }),
      keepalive: true
    }).catch(function () {});
  }, 1000);
})();
