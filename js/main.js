function toggleCard(id) {
  var card = document.getElementById(id);
  var isOpen = card.classList.contains('open');
  var cards = document.querySelectorAll('.section-card');
  for (var i = 0; i < cards.length; i++) { cards[i].classList.remove('open'); }
  if (!isOpen) { card.classList.add('open'); }
}

function openMenu() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
  closeAllDrawers();
}

function closeMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

function switchPage(pageId) {
  document.getElementById('nav-info').classList.remove('active');
  document.getElementById('nav-transport').classList.remove('active');
  document.getElementById('nav-food').classList.remove('active');
  document.getElementById('nav-' + pageId).classList.add('active');
  
  var pages = document.querySelectorAll('.page-section');
  for (var i = 0; i < pages.length; i++) { pages[i].classList.remove('active'); }
  document.getElementById('page-' + pageId).classList.add('active');
  
  var titleEl = document.getElementById('main-title');
  if(pageId === 'info') titleEl.setAttribute('data-i18n', 'headline_info');
  else if (pageId === 'transport') titleEl.setAttribute('data-i18n', 'headline_transp');
  else if (pageId === 'food') titleEl.setAttribute('data-i18n', 'headline_food');
  
  var currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
  applyTranslations(currentLang);
  closeMenu();
  window.scrollTo(0,0);
}

function closeAllDrawers() {
  document.getElementById('lang-drawer').classList.remove('open');
  document.getElementById('theme-drawer').classList.remove('open');
  document.getElementById('host-drawer').classList.remove('open');
  document.getElementById('emerg-drawer').classList.remove('open');
}

function toggleLangDrawer() {
  var d = document.getElementById('lang-drawer');
  var isOpen = d.classList.contains('open');
  closeAllDrawers();
  if(!isOpen) d.classList.add('open');
}

function toggleThemeDrawer() {
  var d = document.getElementById('theme-drawer');
  var isOpen = d.classList.contains('open');
  closeAllDrawers();
  if(!isOpen) d.classList.add('open');
}

function toggleHostDrawer() {
  var d = document.getElementById('host-drawer');
  var isOpen = d.classList.contains('open');
  closeAllDrawers();
  if(!isOpen) d.classList.add('open');
}

function toggleEmergDrawer() {
  var d = document.getElementById('emerg-drawer');
  var isOpen = d.classList.contains('open');
  closeAllDrawers();
  if(!isOpen) d.classList.add('open');
}

function copyWifi() {
  var passwordText = document.getElementById("wifi-pass").innerText;
  navigator.clipboard.writeText(passwordText).then(function() {
    var btn = document.getElementById("btn-copy-wifi");
    var lang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
    btn.innerHTML = '<i class="fas fa-check"></i> <span>' + T[lang].btn_copied + '</span>';
    setTimeout(function() {
      btn.innerHTML = '<i class="fas fa-copy"></i> <span>' + T[lang].btn_copy + '</span>';
    }, 2000);
  });
}

function applyTranslations(lang) {
  if (typeof T === 'undefined') return;
  var t = T[lang];
  var els = document.querySelectorAll('[data-i18n]');
  for (var j = 0; j < els.length; j++) {
    var key = els[j].getAttribute('data-i18n');
    if (t[key] !== undefined) els[j].innerHTML = t[key];
  }
}

function handleScroll() {
  var scrollY = window.scrollY;
  var progress = scrollY / 180;
  if (progress > 1) progress = 1;
  document.documentElement.style.setProperty('--scroll', progress);
}

window.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener("DOMContentLoaded", function() {
  applyTranslations('it');
});
