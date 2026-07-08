/* ===== Northern Borealis — main.js ===== */

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile menu toggle ---
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('open');
      }
    });
  }

  // --- Add solid background to header on scroll ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

});
