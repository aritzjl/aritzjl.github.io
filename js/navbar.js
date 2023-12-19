const headerElements = {
  hamburgerMenu: document.getElementById('hamburgerMenu'),
  navMenu: document.getElementById('navMenu')
};

const iconSVG = {
  bell: document.getElementById('bellIcon'),
};

headerElements.hamburgerMenu.addEventListener('click', () => {
  headerElements.navMenu.classList.toggle('active');
});


// Changes the src of the SVG icon on mouseover
function handleMouseOver() {
  this.src = `/static/svg/${this.id}Hover.svg`;
}

// Changes the src of the SVG icon back to its original value on mouseout
function handleMouseOut() {
  this.src = `/static/svg/${this.id}.svg`;
}

// Removes mouseover and mouseout event listeners from SVG icons
function removeSvgEvents() {
  Object.values(iconSVG).forEach(element => {
    element.removeEventListener('mouseover', handleMouseOver);
    element.removeEventListener('mouseout', handleMouseOut);
  });
}

// Checks screen width and adds or removes SVG event listeners accordingly
function checkScreenWidth() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    handleSvg();
  } else {
    removeSvgEvents();
  }
}

window.addEventListener('DOMContentLoaded', checkScreenWidth);

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkScreenWidth, 200);
});

const { bell } = iconSVG;
const navBarMenuMobile = document.getElementById('navBarMenuMobile');
const originalParent = bell.parentElement;
const originalNextSibling = bell.nextElementSibling;

// Moves the bell icon to a different location depending on screen width
function moveElement() {
  if (window.matchMedia("(max-width: 1023px)").matches) {
    navBarMenuMobile.insertBefore(bell, navBarMenuMobile.firstChild);
    bell.classList.add('ml-auto');
  } else {
    originalParent.insertBefore(bell, originalNextSibling);
    bell.classList.remove('ml-auto');
  }
}

moveElement();

let moveTimeout;
window.addEventListener('resize', () => {
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(moveElement, 200);
});


var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {

  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // if set via local storage previously
  if (localStorage.getItem('color-theme')) {
    console.log("test")
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }

    // if NOT set via local storage previously
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