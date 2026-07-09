import { themes } from "./data/themes.js";

const hamburguer = document.querySelector(".hamburguer-container");
const navigation = document.querySelector(".navigation-mob");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  navigation.classList.toggle("active");
});

const links = document.querySelectorAll('.nav-link');

function normalize(path) {
  path = path.replace(/index\.html$/, '');
  path = path.replace(/\.html$/, '');

  if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
  }

  return path;
}

const currentPage = normalize(window.location.pathname);

links.forEach(link => {
  const path = normalize(link.pathname);

  if (path === currentPage) {
    link.classList.add('active');
  }
});

document.addEventListener('click', (event) => {
  const hamburguerClicked = hamburguer.contains(event.target);
  const navigationClicked = navigation.contains(event.target);

  if (!hamburguerClicked && !navigationClicked && navigation.classList.contains("active")) {
    toggle();
  }
});

window.addEventListener('scroll', () => {
  if (hamburguer.classList.contains('active') && navigation.classList.contains('active')) {
    toggle();
  }
});

function toggle() {
  hamburguer.classList.toggle("active");
  navigation.classList.toggle("active");
}

/* TEMA ESCURO */

const themeButton = document.querySelector(".theme-button");
const themeToggle = document.getElementById("theme-toggle");

const logo = document.querySelector('#logo');
const logoFooter = document.querySelector('#logo-footer');
const logoIfba = document.querySelector('#logo-ifba');

let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const savedTheme = localStorage.getItem("theme");

const classMap = {
  "bg-primary": "bg-dark-primary",
  "color-primary": "color-dark-primary",
  "bg-secundary": "bg-dark-secondary",
  "bg-tertiary": "bg-dark-tertiary",
  "bg-quaternary": "bg-dark-quaternary",
  "bg-quinary": "bg-dark-quinary",
  "bg-senary": "bg-dark-senary"
}

function swapThemes(toDark) {
  Object.entries(classMap).forEach(([light, dark]) => {
    const from = toDark ? light : dark;
    const to = toDark ? dark : light;

    document.querySelectorAll(`.${from}`).forEach(el => {
      el.classList.replace(from, to);
    });
  });
}

export function applyTheme(theme) {
  localStorage.setItem("theme", theme);
  const currentTheme = themes[theme];
  
  themeButton.innerHTML = currentTheme.icon;
  logo.src = currentTheme.logo;
  logoFooter?.setAttribute("src", currentTheme.logoFooter);
  logoIfba?.setAttribute("src", currentTheme.logoIfba);

  swapThemes(true ? theme == 'dark' : false);
}

function changeTheme() {
  isDark = !isDark;
  console.log(isDark);
  if (isDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

themeButton.addEventListener('click', () => {
  changeTheme();
});

themeToggle.addEventListener('change', () => {
  changeTheme();
});

if (savedTheme) {
  applyTheme(savedTheme);
  themeToggle.cheked = savedTheme === "dark" ? true : false;
} else {
  const systemTheme = isDark ? "dark" : "light";
  applyTheme(systemTheme);
}
