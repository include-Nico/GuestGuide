function toggleCard(id) {
  var card = document.getElementById(id);
  var isOpen = card.classList.contains('open');
  var cards = document.querySelectorAll('.section-card');
  for (var i = 0; i < cards.length; i++) { cards[i].classList.remove('open'); }
  if (!isOpen) { card.classList.add('open'); }
}

function setDirection(dir) {
  document.getElementById('btn-arr').classList.remove('active');
  document.getElementById('btn-dep').classList.remove('active');
  document.getElementById('content-arrival').style.display = 'none';
  document.getElementById('content-departure').style.display = 'none';

  if (dir === 'arrival') {
    document.getElementById('btn-arr').classList.add('active');
    document.getElementById('content-arrival').style.display = 'block';
  } else {
    document.getElementById('btn-dep').classList.add('active');
    document.getElementById('content-departure').style.display = 'block';
  }
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
  if(pageId === 'info') {
    titleEl.setAttribute('data-i18n', 'headline_info');
  } else if (pageId === 'transport') {
    titleEl.setAttribute('data-i18n', 'headline_transp');
  } else if (pageId === 'food') {
    titleEl.setAttribute('data-i18n', 'headline_food');
  }
  
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

document.addEventListener('click', function(e) {
  var langDrawer = document.getElementById('lang-drawer');
  var langFab = document.getElementById('lang-fab');
  var themeDrawer = document.getElementById('theme-drawer');
  var themeFab = document.getElementById('theme-fab');
  var hostDrawer = document.getElementById('host-drawer');
  var hostFab = document.getElementById('host-fab');
  var emergDrawer = document.getElementById('emerg-drawer');
  var emergFab = document.getElementById('emerg-fab');

  if (!langDrawer.contains(e.target) && !langFab.contains(e.target)) { langDrawer.classList.remove('open'); }
  if (!themeDrawer.contains(e.target) && !themeFab.contains(e.target)) { themeDrawer.classList.remove('open'); }
  if (!hostDrawer.contains(e.target) && !hostFab.contains(e.target)) { hostDrawer.classList.remove('open'); }
  if (!emergDrawer.contains(e.target) && !emergFab.contains(e.target)) { emergDrawer.classList.remove('open'); }
});

function copyWifi() {
  var passwordText = document.getElementById("wifi-pass").innerText;
  navigator.clipboard.writeText(passwordText).then(function() {
    var btn = document.getElementById("btn-copy-wifi");
    var lang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
    
    btn.classList.add("copied");
    btn.innerHTML = '<i class="fas fa-check"></i> <span>' + T[lang].btn_copied + '</span>';
    
    setTimeout(function() {
      btn.classList.remove("copied");
      btn.innerHTML = '<i class="fas fa-copy"></i> <span>' + T[lang].btn_copy + '</span>';
    }, 2000);
  });
}

function applyTranslations(lang) {
  if (typeof T === 'undefined') return;
  var t = T[lang];
  if (!t) return;
  var els = document.querySelectorAll('[data-i18n]');
  for (var j = 0; j < els.length; j++) {
    var key = els[j].getAttribute('data-i18n');
    if (t[key] !== undefined) { els[j].innerHTML = t[key]; }
  }
  initHeaderPadding();
}

document.getElementById('lang-drawer').addEventListener('click', function(e) {
  var btn = e.target.closest('.lang-btn');
  if (!btn) return;
  var lang = btn.getAttribute('data-lang');
  
  var btns = document.querySelectorAll('.lang-btn');
  for (var i = 0; i < btns.length; i++) { btns[i].classList.remove('active'); }
  btn.classList.add('active');
  
  document.getElementById('lang-drawer').classList.remove('open');
  applyTranslations(lang);
});

document.getElementById('theme-drawer').addEventListener('click', function(e) {
  var btn = e.target.closest('.theme-btn');
  if (!btn) return;
  var theme = btn.getAttribute('data-theme');
  
  var btns = document.querySelectorAll('.theme-btn');
  for (var i = 0; i < btns.length; i++) { btns[i].classList.remove('active'); }
  btn.classList.add('active');
  
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-drawer').classList.remove('open');
});

function initHeaderPadding() {
  var currentScroll = document.documentElement.style.getPropertyValue('--scroll');
  document.documentElement.style.setProperty('--scroll', '0');
  var headerHeight = document.getElementById('main-header').offsetHeight;
  document.body.style.paddingTop = headerHeight + 'px';
  if(currentScroll !== '') { document.documentElement.style.setProperty('--scroll', currentScroll); }
  handleScroll();
}

var maxScroll = 180; 
function handleScroll() {
  var scrollY = window.scrollY;
  var progress = scrollY / maxScroll;
  if (progress > 1) progress = 1;
  if (progress < 0) progress = 0;
  document.documentElement.style.setProperty('--scroll', progress);
}

function initSlider() {
  var slider = document.querySelector('.slider-container');
  if(!slider) return;
  var slideTimer = setInterval(function(){
      var maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      var nextScroll = slider.scrollLeft + slider.clientWidth;
      if(slider.scrollLeft >= maxScrollLeft - 5) { nextScroll = 0; }
      slider.scrollTo({ top: 0, left: nextScroll, behavior: 'smooth' });
  }, 3500); 
  slider.addEventListener('touchstart', function() { clearInterval(slideTimer); }, {passive: true});
  slider.addEventListener('mousedown', function() { clearInterval(slideTimer); });
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', initHeaderPadding);

document.addEventListener("DOMContentLoaded", function() {
  applyTranslations('it');
  initSlider();
  setTimeout(initHeaderPadding, 50); 
});
