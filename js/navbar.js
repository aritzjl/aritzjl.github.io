// Elementos del encabezado
const headerElements = {
  hamburgerMenu: document.getElementById('hamburgerMenu'),
  navMenu: document.getElementById('navMenu')
};

// Iconos SVG
const iconSVG = {
  bell: document.getElementById('bellIcon'),
};

// Manejador de clic para mostrar/ocultar el menú de navegación en dispositivos móviles
headerElements.hamburgerMenu.addEventListener('click', () => {
  headerElements.navMenu.classList.toggle('active');
});

// Función para cambiar la fuente del ícono SVG al pasar el ratón sobre él
function handleMouseOver() {
  this.src = `/static/svg/${this.id}Hover.svg`;
}

// Función para restaurar la fuente del ícono SVG a su valor original al quitar el ratón
function handleMouseOut() {
  this.src = `/static/svg/${this.id}.svg`;
}

// Función para eliminar los escuchadores de eventos mouseover y mouseout de los íconos SVG
function removeSvgEvents() {
  Object.values(iconSVG).forEach(element => {
    element.removeEventListener('mouseover', handleMouseOver);
    element.removeEventListener('mouseout', handleMouseOut);
  });
}

// Comprueba el ancho de la pantalla y agrega o elimina los escuchadores de eventos SVG en consecuencia
function checkScreenWidth() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    handleSvg();
  } else {
    removeSvgEvents();
  }
}

// Comprobar el ancho de la pantalla al cargar la página
window.addEventListener('DOMContentLoaded', checkScreenWidth);

let resizeTimeout;
// Comprobar el ancho de la pantalla al redimensionar la ventana
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkScreenWidth, 200);
});

// Elementos relacionados con el icono de campana (bell)
const { bell } = iconSVG;
const navBarMenuMobile = document.getElementById('navBarMenuMobile');
const originalParent = bell.parentElement;
const originalNextSibling = bell.nextElementSibling;

// Mueve el icono de la campana a una ubicación diferente según el ancho de la pantalla
function moveElement() {
  if (window.matchMedia("(max-width: 1023px)").matches) {
    navBarMenuMobile.insertBefore(bell, navBarMenuMobile.firstChild);
    bell.classList.add('ml-auto');
  } else {
    originalParent.insertBefore(bell, originalNextSibling);
    bell.classList.remove('ml-auto');
  }
}

// Mover el elemento al cargar la página
moveElement();

let moveTimeout;
// Mover el elemento al redimensionar la ventana
window.addEventListener('resize', () => {
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(moveElement, 200);
});

// Elementos relacionados con el cambio de tema
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Cambia los íconos dentro del botón según la configuración previa
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

// Agregar un evento de clic al botón de cambio de tema
themeToggleBtn.addEventListener('click', function () {

  // Cambiar los íconos dentro del botón
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // Si se estableció previamente a través de almacenamiento local
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }

  // Si NO se estableció previamente a través de almacenamiento local
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }

});
