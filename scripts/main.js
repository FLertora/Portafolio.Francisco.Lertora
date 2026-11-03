// Navegación móvil
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Cerrar menú al hacer clic en un enlace (en móvil)
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Modo oscuro / claro
const toggleThemeBtn = document.getElementById("toggleTheme");
const body = document.body;
const THEME_KEY = "portfolio-theme";

function setTheme(theme) {
  body.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* almacenamiento no disponible: se ignora */
  }
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (e) {
    /* almacenamiento no disponible: se ignora */
  }

  if (saved === "light" || saved === "dark") {
    setTheme(saved);
  } else {
    const prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }
}

toggleThemeBtn.addEventListener("click", () => {
  setTheme(body.classList.contains("light") ? "dark" : "light");
});

initTheme();

// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Filtro de proyectos
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const visible = filter === "all" || filter === card.dataset.category;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

// Formulario de contacto (Formspree)
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

function showMessage(text, type) {
  formMsg.textContent = text;
  formMsg.classList.remove("is-ok", "is-error");
  if (type) formMsg.classList.add(type);
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("Enviando...", null);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      showMessage("¡Gracias! Tu mensaje fue enviado correctamente.", "is-ok");
      contactForm.reset();
    } else {
      showMessage("Hubo un error. Por favor intenta nuevamente.", "is-error");
    }
  } catch (error) {
    showMessage("Error de conexión. Inténtalo más tarde.", "is-error");
  }
});
