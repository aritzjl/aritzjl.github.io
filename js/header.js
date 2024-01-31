document.addEventListener("DOMContentLoaded", function () {
  // Función para cerrar todos los menús desplegables abiertos, excepto el especificado
  function closeOtherDropdowns(excludeDropdownId) {
    // Seleccionamos todos los elementos con la clase "dropdown"
    var dropdowns = document.querySelectorAll(".dropdown");
    // Iteramos sobre cada elemento
    dropdowns.forEach(function (dropdown) {
      // Si el id del elemento actual no coincide con excludeDropdownId, lo ocultamos
      if (dropdown.id !== excludeDropdownId) {
        dropdown.style.display = "none";
      }
    });
  }

  // Función para alternar la visibilidad del menú
  function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      closeOtherDropdowns(dropdownId);
      dropdown.style.display = "block";
    }
  }

  // Manejadores de eventos para los botones de los menús desplegables
  document.getElementById("dropdownNavbarLink").addEventListener("click", function () {
    toggleDropdown("dropdownNavbar");
  });

  document.getElementById("doubleDropdownButton1").addEventListener("click", function () {
    toggleDropdown("doubleDropdown1");
  });

  document.getElementById("doubleDropdownButton2").addEventListener("click", function () {
    toggleDropdown("doubleDropdown2");
  });

  document.getElementById("doubleDropdownButton3").addEventListener("click", function () {
    toggleDropdown("doubleDropdown3");
  });

  document.getElementById("doubleDropdownButton4").addEventListener("click", function () {
    toggleDropdown("doubleDropdown4");
  });

  document.getElementById("doubleDropdownButton5").addEventListener("click", function () {
    toggleDropdown("doubleDropdown5");
  });
});
