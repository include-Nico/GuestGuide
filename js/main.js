// Navigazione tra le Pagine
function switchPage(pageId) {
  document.getElementById('nav-info').classList.remove('active');
  document.getElementById('nav-transport').classList.remove('active');
  document.getElementById('nav-food').classList.remove('active'); // <-- Aggiunto
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
    titleEl.setAttribute('data-i18n', 'headline_food'); // <-- Aggiunto
  }
  
  var currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
  applyTranslations(currentLang);
  closeMenu();
  window.scrollTo(0,0);
}
