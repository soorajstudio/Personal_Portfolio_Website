// Single, guarded script that runs after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const elementToggleFunc = function (elem) { if (elem) elem.classList.toggle('active'); };

  // Certificate modal
  const certificateItems = document.querySelectorAll('[data-certificate-item]');
  const certificateModalContainer = document.querySelector('[data-certificate-modal-container]');
  const certificateOverlay = document.querySelector('[data-certificate-overlay]');
  const certificateModalCloseBtn = document.querySelector('[data-certificate-modal-close-btn]');
  const certificateModalImg = document.querySelector('[data-certificate-modal-img]');
  const certificateModalTitle = document.querySelector('[data-certificate-modal-title]');
  const certificateModalText = document.querySelector('[data-certificate-modal-text]');

  const openCertificateModal = (item) => {
    if (!item) return;
    const img = item.querySelector('[data-certificate-img]');
    const title = item.querySelector('[data-certificate-title]');
    const text = item.querySelector('[data-certificate-text]');
    if (certificateModalImg && img) { certificateModalImg.src = img.src; certificateModalImg.alt = img.alt; }
    if (certificateModalTitle && title) certificateModalTitle.textContent = title.textContent;
    if (certificateModalText && text) certificateModalText.innerHTML = text.innerHTML;
    if (certificateModalContainer) { certificateModalContainer.classList.add('active'); document.body.style.overflow = 'hidden'; }
  };

  const closeCertificateModal = () => {
    if (certificateModalContainer) certificateModalContainer.classList.remove('active');
    document.body.style.overflow = '';
  };

  certificateItems.forEach((it) => it.addEventListener('click', (e) => { e.preventDefault(); openCertificateModal(it); }));
  [certificateOverlay, certificateModalCloseBtn].filter(Boolean).forEach((btn) => btn.addEventListener('click', closeCertificateModal));

  // Project modal
  const projectItems = document.querySelectorAll('[data-project-item]');
  const projectModalContainer = document.querySelector('[data-project-modal-container]');
  const projectOverlay = document.querySelector('[data-project-overlay]');
  const projectModalCloseBtn = document.querySelector('[data-project-modal-close-btn]');
  const projectModalIframe = document.querySelector('[data-project-modal-iframe]');

  const openProjectModal = (item) => {
    if (!item) return;
    const linkEl = item.querySelector('[data-project-link]');
    const href = linkEl ? linkEl.getAttribute('href') : '';
    if (projectModalIframe) projectModalIframe.src = href || '';
    if (projectModalContainer) { projectModalContainer.classList.add('active'); document.body.style.overflow = 'hidden'; }
  };

  const closeProjectModal = () => {
    if (projectModalContainer) projectModalContainer.classList.remove('active');
    if (projectModalIframe) projectModalIframe.src = '';
    document.body.style.overflow = '';
  };

  projectItems.forEach((it) => it.addEventListener('click', (e) => { e.preventDefault(); openProjectModal(it); }));
  [projectOverlay, projectModalCloseBtn].filter(Boolean).forEach((btn) => btn.addEventListener('click', closeProjectModal));

  // Close modals on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (certificateModalContainer && certificateModalContainer.classList.contains('active')) closeCertificateModal();
      if (projectModalContainer && projectModalContainer.classList.contains('active')) closeProjectModal();
    }
  });

  // Sidebar toggle
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  if (sidebarBtn) sidebarBtn.addEventListener('click', function () { elementToggleFunc(sidebar); });

  // Custom select + filters
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-select-value]');
  const filterBtn = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  if (select) select.addEventListener('click', function () { elementToggleFunc(this); });

  const filterFunc = function (selectedValue) {
    if (!selectedValue) return;
    selectedValue = selectedValue.trim().toLowerCase();
    for (let i = 0; i < filterItems.length; i++) {
      const cat = (filterItems[i].dataset.category || '').toLowerCase();
      if (selectedValue === 'all' || selectedValue === cat) {
        filterItems[i].classList.add('active');
      } else {
        filterItems[i].classList.remove('active');
      }
    }
  };

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function () {
      const sv = this.innerText || '';
      if (selectValue) selectValue.innerText = sv;
      if (select) elementToggleFunc(select);
      filterFunc(sv);
    });
  }

  let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener('click', function () {
      const sv = this.innerText || '';
      if (selectValue) selectValue.innerText = sv;
      filterFunc(sv);
      if (lastClickedBtn) lastClickedBtn.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;
    });
  }

  // Ensure initial filter state (show all) and mark first filter button active if present
  if (selectValue && selectValue.innerText && selectValue.innerText.toLowerCase() !== 'select category') {
    filterFunc(selectValue.innerText);
  } else {
    filterFunc('all');
  }
  if (lastClickedBtn && !lastClickedBtn.classList.contains('active')) lastClickedBtn.classList.add('active');

  // Page navigation
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');
  navigationLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const target = this.innerText.trim().toLowerCase();
      pages.forEach((p) => p.classList.remove('active'));
      navigationLinks.forEach((l) => l.classList.remove('active'));
      const matched = Array.from(pages).find((p) => p.dataset.page === target);
      if (matched) {
        matched.classList.add('active');
        this.classList.add('active');
        window.scrollTo(0, 0);
      }
    });
  });

});