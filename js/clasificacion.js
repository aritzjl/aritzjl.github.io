// Ruta del archivo XML
const xmlFilePath = '/XMLyXSD/XMLClasificacion.xml';

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

// Función para cargar dinámicamente los datos en la tabla desde el XML
function loadTableData() {
    // Cargamos el documento XML
    const xmlDoc = loadXMLDoc(xmlFilePath);
    
    // Obtenemos el cuerpo de la tabla por su ID
    const tableBody = document.getElementById('table-body');

    // Obtenemos todas las etiquetas 'team' del XML
    const teams = xmlDoc.getElementsByTagName('team');

    // Iteramos sobre cada equipo en el XML
    for (let i = 0; i < teams.length; i++) {
        // Obtenemos los datos de cada equipo
        const team = teams[i];
        const position = team.getElementsByTagName('position')[0].textContent;
        const escudoPath = team.getElementsByTagName('escudo_path')[0].textContent;
        const nombre = team.getElementsByTagName('nombre')[0].textContent;
        const ganados = team.getElementsByTagName('ganados')[0].textContent;
        const perdidos = team.getElementsByTagName('perdidos')[0].textContent;
        const empatados = team.getElementsByTagName('empatados')[0].textContent;
        const jugados = team.getElementsByTagName('jugados')[0].textContent;
        const golesF = team.getElementsByTagName('goles_f')[0].textContent;
        const golesC = team.getElementsByTagName('goles_c')[0].textContent;
        const puntos = team.getElementsByTagName('puntos')[0].textContent;

        // Creamos una nueva fila en la tabla
        const newRow = document.createElement('tr');
        
        // Añadimos una clase alternante para el estilo de fila
        newRow.className = i % 2 === 0 ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700' : '';

        // Insertamos el HTML en la nueva fila con los datos del equipo
        newRow.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${position}</td>
            <td class="px-6 py-4"><img src="${escudoPath}" alt="Escudo Equipo" class="h-8"></td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${nombre}</td>
            <td class="px-6 py-4">${ganados}</td>
            <td class="px-6 py-4">${perdidos}</td>
            <td class="px-6 py-4">${empatados}</td>
            <td class="px-6 py-4">${jugados}</td>
            <td class="px-6 py-4">${golesF}</td>
            <td class="px-6 py-4">${golesC}</td>
            <td class="px-6 py-4">${puntos}</td>
        `;

        // Añadimos la nueva fila a la tabla
        tableBody.appendChild(newRow);
    }
}

// La función loadTableData se ejecutará cuando la ventana haya cargado completamente
window.onload = loadTableData;
