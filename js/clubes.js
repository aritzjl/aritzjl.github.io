const xmlFilePath = '/XMLyXSD/equipos.xml'; // Ruta del archivo XML

// Función para cargar un archivo XML desde el servidor
function loadXMLDoc(filename) {
    // Comprobación del tipo de objeto XMLHttpRequest disponible en el navegador
    if (window.XMLHttpRequest) {
        var xhttp = new XMLHttpRequest(); // Para navegadores modernos
    } else {
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP"); // Para versiones antiguas de Internet Explorer
    }

    xhttp.open("GET", filename, false); // Abrir conexión para obtener el archivo XML de manera síncrona
    xhttp.send(); // Enviar solicitud

    return xhttp.responseXML; // Devolver el objeto XML
}

// Función para llenar el menú desplegable de temporadas
function populateSeasonDropdown(xmlDoc) {
    const selectElement = document.getElementById('countries'); // Obtener el elemento de selección de países
    selectElement.innerHTML = ''; // Limpiar el contenido existente del menú desplegable

    const temporadas = xmlDoc.getElementsByTagName('temporada'); // Obtener todas las etiquetas 'temporada' del XML

    // Iterar sobre cada temporada y crear una opción para el menú desplegable
    for (let i = 0; i < temporadas.length; i++) {
        const temporada = temporadas[i];
        const temporadaId = temporada.getAttribute('id'); // Obtener el ID de la temporada

        const optionElement = document.createElement('option'); // Crear un elemento 'option'
        optionElement.value = temporadaId; // Establecer el valor de la opción como el ID de la temporada
        optionElement.text = temporadaId; // Establecer el texto de la opción como el ID de la temporada
        selectElement.add(optionElement); // Agregar la opción al menú desplegable
    }
}

// Función para actualizar los datos de la tabla según la temporada seleccionada
function updateTableData(selectedSeason) {
    const xmlDoc = loadXMLDoc(xmlFilePath); // Cargar el archivo XML

    populateSeasonDropdown(xmlDoc); // Llenar el menú desplegable de temporadas

    const selectElement = document.getElementById('countries'); // Obtener el elemento de selección de países

    const temporadas = xmlDoc.getElementsByTagName('temporada'); // Obtener todas las etiquetas 'temporada' del XML
    let hasCurrentYear = false;

    // Comprobar si la temporada seleccionada está presente en los datos XML
    for (let i = 0; i < temporadas.length; i++) {
        const temporada = temporadas[i];
        const temporadaId = temporada.getAttribute('id');
        if (temporadaId === '2024') { // Comprobar si la temporada actual es '2024'
            hasCurrentYear = true;
            break;
        }
    }

    // Si la temporada '2024' no está presente, mostrar un mensaje y detener la ejecución
    if (!hasCurrentYear) {
        selectElement.innerHTML = '<option selected>Elige una Temporada</option>';
        return;
    }

    selectElement.value = '2024'; // Seleccionar la temporada '2024' por defecto

    const tableBody = document.getElementById('table-body'); // Obtener el cuerpo de la tabla
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente en la tabla

    const clubes = xmlDoc.getElementsByTagName('club'); // Obtener todas las etiquetas 'club' del XML

    // Iterar sobre cada club en los datos XML
    for (let i = 0; i < clubes.length; i++) {
        const club = clubes[i];
        const temporadaId = club.closest('temporada').getAttribute('id'); // Obtener el ID de la temporada del club

        // Si el club pertenece a la temporada seleccionada, extraer sus datos y crear una fila en la tabla
        if (temporadaId === selectedSeason) {
            const nomEq = club.getElementsByTagName('nomEq')[0].textContent; // Nombre del equipo
            const estadio = club.getElementsByTagName('estadio')[0].textContent; // Nombre del estadio
            const presEq = club.getElementsByTagName('presEq')[0].textContent; // Presidente del equipo
            const cantSocios = club.getElementsByTagName('cantSocios')[0].textContent; // Cantidad de socios
            const nomEst = club.getElementsByTagName('nomEst')[0].textContent; // Nombre establecido del equipo
            const codEq = club.getElementsByTagName('codEq')[0].textContent; // Código del equipo

            // Crear una nueva fila (tr) para el club y añadirle un evento de clic
            const newRow = document.createElement('tr');
            newRow.className = i % 2 === 0 ? ' dark:border-gray-700' : ''; // Alternar colores de fila

            newRow.addEventListener('click', function() {
                // Crear un objeto con la información del club seleccionado
                const clubInfo = {
                    nomEq: nomEq,
                    estadio: estadio,
                    presEq: presEq,
                    cantSocios: cantSocios,
                    nomEst: nomEst,
                    codEq: codEq
                };

                // Convertir el objeto a JSON y codificarlo para enviarlo como parámetro en la URL
                const clubInfoJSON = encodeURIComponent(JSON.stringify(clubInfo));
                window.location.href = `PrimeroClub.html?clubInfo=${clubInfoJSON}`; // Redirigir a la página 'PrimeroClub.html' con los datos del club
            });

            // Llenar la fila con los datos del club
            newRow.innerHTML = `
                <td class="px-6 py-4"><img src="/imagenes/Spirit.png" alt="Escudo Equipo" class="h-8"></td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${nomEq}</td>
                <td class="px-6 py-4">${estadio}</td>
                <td class="px-6 py-4">${presEq}</td>
                <td class="px-6 py-4">${cantSocios}</td>
                <td class="px-6 py-4">${nomEst}</td>
            `;

            tableBody.appendChild(newRow); // Añadir la fila a la tabla
        }
    }
}

// Función que se ejecuta cuando la página se carga completamente
window.onload = function() {
    const defaultSelectedSeason = '2024'; // Temporada seleccionada por defecto
    updateTableData(defaultSelectedSeason); // Actualizar los datos de la tabla
};

// Agregar un evento de cambio al menú desplegable de temporadas
document.getElementById('countries').addEventListener('change', function() {
    const selectedSeason = this.value; // Obtener la temporada seleccionada
    updateTableData(selectedSeason); // Actualizar los datos de la tabla según la temporada seleccionada

    // Actualizar la opción seleccionada en el menú desplegable
    const options = this.options;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (option.value === selectedSeason) {
            option.setAttribute('selected', 'selected'); // Establecer como seleccionada
        } else {
            option.removeAttribute('selected'); // Quitar la selección
        }
    }
});
