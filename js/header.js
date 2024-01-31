document.addEventListener("DOMContentLoaded", function () {
    // Функция для закрытия всех открытых выпадающих меню, кроме указанного
    function closeOtherDropdowns(excludeDropdownId) {
      var dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach(function (dropdown) {
        if (dropdown.id !== excludeDropdownId) {
          dropdown.style.display = "none";
        }
      });
    }

    // Функция для переключения видимости меню
    function toggleDropdown(dropdownId) {
      var dropdown = document.getElementById(dropdownId);
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      } else {
        closeOtherDropdowns(dropdownId);
        dropdown.style.display = "block";
      }
    }

    // Обработчики событий для кнопок выпадающих меню
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