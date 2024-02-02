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

function populateSeasonDropdown(xmlDoc) {
    const selectElement = document.getElementById('countries');
    selectElement.innerHTML = '<option selected>Choose a Temporada</option>';

    const temporadas = xmlDoc.getElementsByTagName('temporada');

    for (let i = 0; i < temporadas.length; i++) {
        const temporada = temporadas[i];
        const temporadaId = temporada.getAttribute('id');

        if (!selectElement.querySelector(`option[value="${temporadaId}"]`)) {
            const optionElement = document.createElement('option');
            optionElement.value = temporadaId;
            optionElement.text = temporadaId;
            selectElement.add(optionElement);
        }
    }
}

// Функция для загрузки динамических данных в таблицу из XML
function loadTableData(selectedSeason) {
    // Загружаем XML-документ
    const xmlDoc = loadXMLDoc(xmlFilePath);
    populateSeasonDropdown(xmlDoc);
    
    // Получаем тело таблицы по его ID
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    // Получаем все теги 'team' из XML
    const teams = xmlDoc.getElementsByTagName('team');

    const selectElement = document.getElementById('countries');
    const defaultOption = selectElement.querySelector('option[selected]');
    defaultOption.textContent = selectedSeason;

    if (selectedSeason === 'Choose a Temporada') {
        return; // Не отображаем информацию при пустом значении Temporada
    }

    // Итерируем по каждой команде в XML
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const temporadaId = team.closest('temporada').getAttribute('id');

        if (temporadaId === selectedSeason) {
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
        
            // Añadimos una clase alternante para el estilo de fila
// Añadimos una clase alternante para el estilo de fila
const newRow = document.createElement('tr');
newRow.className = i % 2 === 0 ? ' dark:border-gray-700' : '';

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
}

// La función loadTableData se ejecutará cuando la ventana haya cargado completamente
document.getElementById('countries').addEventListener('change', function() {
    const selectedSeason = this.value;
    loadTableData(selectedSeason);
});

window.onload = function() {
    const defaultSelectedSeason = 'Choose a Temporada';
    loadTableData(defaultSelectedSeason);
};
