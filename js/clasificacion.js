const xmlFilePath = '/XMLyXSD/clasificacion.xml';

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

// Función para calcular los puntos de un equipo basado en partidos ganados y empatados
function calculatePoints(ganados, empatados) {
    return (ganados * 3) + empatados; // Puntos = (Ganados * 3) + Empatados
}

// Función para calcular el total de partidos jugados por un equipo
function calculateJugados(ganados, perdidos, empatados) {
    return ganados + perdidos + empatados; // Total de partidos jugados = Ganados + Perdidos + Empatados
}

// Función principal para cargar y mostrar los datos de la tabla
function loadTableData(selectedSeason) {
    const xmlDoc = loadXMLDoc(xmlFilePath); // Cargar el archivo XML
    
    populateSeasonDropdown(xmlDoc); // Llenar el menú desplegable de temporadas
    
    const selectElement = document.getElementById('countries'); // Obtener el elemento de selección de países
    
    const temporadas = xmlDoc.getElementsByTagName('temporada'); // Obtener todas las etiquetas 'temporada' del XML
    let hasCurrentYear = false;
    
    // Comprobar si la temporada seleccionada está presente en los datos XML
    for (let i = 0; i < temporadas.length; i++) {
        const temporada = temporadas[i];
        const temporadaId = temporada.getAttribute('id');
        if (temporadaId === '2024') {
            hasCurrentYear = true;
            break;
        }
    }

    // Si la temporada seleccionada no está presente, mostrar un mensaje y detener la ejecución
    if (!hasCurrentYear) {
        selectElement.innerHTML = '<option selected>Elige una Temporada</option>';
        return;
    }

    selectElement.value = '2024'; // Seleccionar la temporada por defecto al cargar la página

    const tableBody = document.getElementById('table-body'); // Obtener el cuerpo de la tabla
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente en la tabla

    const teams = xmlDoc.getElementsByTagName('team'); // Obtener todas las etiquetas 'team' del XML
    const teamsData = []; // Arreglo para almacenar los datos de los equipos

    // Iterar sobre cada equipo en los datos XML
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const temporadaId = team.closest('temporada').getAttribute('id'); // Obtener el ID de la temporada del equipo

        // Si el equipo pertenece a la temporada seleccionada, extraer sus datos y añadirlos al arreglo
        if (temporadaId === selectedSeason) {
            const nomEq = team.getElementsByTagName('nomEq')[0].textContent;
            const ganados = parseInt(team.getElementsByTagName('ganados')[0].textContent);
            const perdidos = parseInt(team.getElementsByTagName('perdidos')[0].textContent);
            const empatados = parseInt(team.getElementsByTagName('empatados')[0].textContent);
            const golesF = team.getElementsByTagName('goles_f')[0].textContent;
            const golesC = team.getElementsByTagName('goles_c')[0].textContent;
            const puntos = calculatePoints(ganados, empatados); // Calcular los puntos del equipo
            const jugados = calculateJugados(ganados, perdidos, empatados); // Calcular los partidos jugados

            // Añadir los datos del equipo al arreglo 'teamsData'
            teamsData.push({
                nomEq: nomEq,
                ganados: ganados,
                perdidos: perdidos,
                empatados: empatados,
                golesF: golesF,
                golesC: golesC,
                puntos: puntos,
                jugados: jugados
            });
        }

        // Ordenar los equipos por puntos y diferencia de goles
        teamsData.sort((a, b) => {
            if (a.puntos !== b.puntos) {
                return b.puntos - a.puntos;
            } else {
                const diferenciaGolesA = a.golesF - a.golesC;
                const diferenciaGolesB = b.golesF - b.golesC;
                return diferenciaGolesB - diferenciaGolesA;
            }
        });
    }

    // Ordenar los equipos nuevamente por puntos (por si acaso)
    teamsData.sort((a, b) => b.puntos - a.puntos);

    // Crear filas para cada equipo y añadirlos a la tabla
    for (let i = 0; i < teamsData.length; i++) {
        const teamData = teamsData[i];

        // Crear una nueva fila (tr) para el equipo
        const newRow = document.createElement('tr');
        newRow.className = i % 2 === 0 ? ' dark:border-gray-700' : ''; // Alternar colores de fila

        // Llenar la fila con los datos del equipo
        newRow.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${i + 1}</td>
            <td class="px-6 py-4"><img src="/imagenes/Spirit.png" alt="Escudo Equipo" class="h-8"></td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${teamData.nomEq}</td>
            <td class="px-6 py-4">${teamData.ganados}</td>
            <td class="px-6 py-4">${teamData.perdidos}</td>
            <td class="px-6 py-4">${teamData.empatados}</td>
            <td class="px-6 py-4">${teamData.jugados}</td>
            <td class="px-6 py-4">${teamData.golesF}</td>
            <td class="px-6 py-4">${teamData.golesC}</td>
            <td class="px-6 py-4">${teamData.puntos}</td>
        `;

        tableBody.appendChild(newRow); // Añadir la fila a la tabla
    }
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

        // Crear una nueva opción (option) para el menú desplegable
        const optionElement = document.createElement('option');
        optionElement.value = temporadaId; // Asignar el valor de la temporada a la opción
        optionElement.text = temporadaId; // Asignar el texto de la temporada a la opción
        selectElement.add(optionElement); // Agregar la opción al menú desplegable
    }
}

// Función que se ejecuta cuando la página se carga completamente
window.onload = function() {
    const defaultSelectedSeason = '2024'; // Temporada seleccionada por defecto al cargar la página
    loadTableData(defaultSelectedSeason); // Cargar y mostrar los datos de la tabla para la temporada por defecto
};

// Evento que se activa cuando se cambia la temporada seleccionada en el menú desplegable
document.getElementById('countries').addEventListener('change', function() {
    const selectedSeason = this.value; // Obtener la temporada seleccionada
    loadTableData(selectedSeason); // Cargar y mostrar los datos de la tabla para la temporada seleccionada

    // Actualizar la opción seleccionada en el menú desplegable
    const options = this.options;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (option.value === selectedSeason) {
            option.setAttribute('selected', 'selected');
        } else {
            option.removeAttribute('selected');
        }
    }
});
