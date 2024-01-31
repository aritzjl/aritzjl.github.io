// Ruta del archivo XML
const xmlFilePath = '/XMLyXSD/XMLClubes.xml';

// Función para cargar un archivo XML
function loadXMLDoc(filename) {
    // Comprobamos si el navegador es compatible con XMLHttpRequest
    if (window.XMLHttpRequest) {
        var xhttp = new XMLHttpRequest();
    } else {
        // En caso de ser Internet Explorer 6 o 5, utilizamos ActiveXObject
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    // Abrimos la conexión al archivo XML de manera síncrona (false)
    xhttp.open("GET", filename, false);
    xhttp.send();
    
    // Devolvemos el documento XML
    return xhttp.responseXML;
}

// Función para actualizar la tabla con los datos de los clubes
function updateTableData() {
    // Cargamos el documento XML
    const xmlDoc = loadXMLDoc(xmlFilePath);

    // Obtenemos el cuerpo de la tabla por su ID
    const tableBody = document.getElementById('table-body');
    
    // Obtenemos todas las etiquetas 'team' del XML
    const clubes = xmlDoc.getElementsByTagName('club');

    // Recorremos todos los clubes (en este caso, del 1 al 6)
    for (let i = 0; i < clubes.length; i++) {
        // Obtenemos el elemento del club desde el XML
        const club = clubes[i];
        
        // Obtenemos los elementos necesarios de datos del club
        const escudo = club.getElementsByTagName('escudo')[0].textContent;
        const nombre = club.getElementsByTagName('nombre')[0].textContent;
        const estadio = club.getElementsByTagName('estadio')[0].textContent;
        const presidente = club.getElementsByTagName('presidente')[0].textContent;
        const cantidadSocios = club.getElementsByTagName('cantidadSocios')[0].textContent;
        const ciudad = club.getElementsByTagName('ciudad')[0].textContent;

        // Creamos una nueva fila en la tabla
        const newRow = document.createElement('tr');

                // Añadimos una clase alternante para el estilo de fila
                newRow.className = i % 2 === 0 ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700' : '';

                // Insertamos el HTML en la nueva fila con los datos del equipo
                newRow.innerHTML = `
                    <td class="px-6 py-4"><img src="${escudo}" alt="Escudo Equipo" class="h-8"></td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${nombre}</td>
                    <td class="px-6 py-4">${estadio}</td>
                    <td class="px-6 py-4">${presidente}</td>
                    <td class="px-6 py-4">${cantidadSocios}</td>
                    <td class="px-6 py-4">${ciudad}</td>
                `;
        
                // Añadimos la nueva fila a la tabla
                tableBody.appendChild(newRow);
    }
}

// La función loadTableData se ejecutará cuando la ventana haya cargado completamente
window.onload = updateTableData;
