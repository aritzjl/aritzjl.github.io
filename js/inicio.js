document.addEventListener('DOMContentLoaded', function () {
    // Procesar datos para tres clubes
    for (let i = 1; i <= 3; i++) {
        // Realizar una solicitud fetch para obtener el archivo XML
        fetch(`/XMLyXSD/XMLClubes.xml`)
            .then(response => response.text())
            .then(xmlString => {
                // Crear un objeto DOMParser para analizar el XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
                
                // Definir los identificadores para los elementos HTML
                const clubId = `club${i}`;
                const escudoId = `escudo${i}`;
                const codigoId = `codigo${i}`;
                const nombreId = `nombre${i}`;
                const estadioId = `estadio${i}`;
                const presidenteId = `presidente${i}`;
                const cantidadId = `cantidad${i}`;

                // Llamar a la función para actualizar la información del club
                updateClubInfo(xmlDoc, clubId, escudoId, codigoId, nombreId, estadioId, presidenteId, cantidadId);
            });
    }
});

// Función para actualizar la información del club en la página HTML
function updateClubInfo(xmlDoc, clubId, escudoId, codigoId, nombreId, estadioId, presidenteId, cantidadId) {
    // Obtener el elemento del club del documento XML
    const clubElement = xmlDoc.querySelector(clubId);

    // Verificar si se encontró el elemento del club
    if (clubElement) {
        // Obtener elementos específicos del club del documento XML
        const escudoElement = clubElement.querySelector('escudo');
        const codigoElement = clubElement.querySelector('codigo');
        const nombreElement = clubElement.querySelector('nombre');
        const estadioElement = clubElement.querySelector('estadio');
        const presidenteElement = clubElement.querySelector('presidente');
        const cantidadElement = clubElement.querySelector('cantidad');

        // Actualizar los elementos HTML con la información del club
        document.getElementById(escudoId).src = escudoElement.textContent;
        document.getElementById(codigoId).textContent = codigoElement.textContent;
        document.getElementById(nombreId).textContent = nombreElement.textContent;
        document.getElementById(estadioId).textContent = estadioElement.textContent;
        document.getElementById(presidenteId).textContent = presidenteElement.textContent;
        document.getElementById(cantidadId).textContent = cantidadElement ? cantidadElement.textContent : "N/A";
    } else {
        // Mostrar un mensaje de error si el elemento del club no se encuentra
        console.error(`Club con identificador ${clubId} no encontrado.`);
    }
}
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

