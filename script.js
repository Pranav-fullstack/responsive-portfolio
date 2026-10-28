'use strict';

const root = document.documentElement;
const THEME_KEY = 'task2.theme';

/* ---------- Theme toggle ---------- */
const themeBtn = document.getElementById('theme-btn');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
  return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
}

function updateThemeButton() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  themeBtn.setAttribute('aria-label', `Switch to ${next} theme`);
}

themeBtn.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* storage unavailable */ }
  updateThemeButton();
});

systemDark.addEventListener('change', updateThemeButton);
updateThemeButton();

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('site-nav');

function setMenu(open) {
  nav.classList.toggle('is-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
});

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
