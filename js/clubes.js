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

// Функция для заполнения списка выбора с годами
function populateSeasonDropdown(xmlDoc) {
    const selectElement = document.getElementById('countries');

    // Очищаем текущие элементы в списке выбора
    selectElement.innerHTML = '<option selected>Choose a Temporada</option>';

    // Получаем все элементы temporada из XML
    const temporadas = xmlDoc.getElementsByTagName('temporada');

    // Проходим по каждому элементу temporada и добавляем год в список выбора
    for (let i = 0; i < temporadas.length; i++) {
        const temporada = temporadas[i];
        const temporadaId = temporada.getAttribute('id');
        
        // Проверяем, чтобы не добавлять одинаковые года
        if (!selectElement.querySelector(`option[value="${temporadaId}"]`)) {
            const optionElement = document.createElement('option');
            optionElement.value = temporadaId;
            optionElement.text = temporadaId;
            selectElement.add(optionElement);
        }
    }
}

// Функция для обновления данных в таблице
function updateTableData(selectedSeason) {
    // Загружаем документ XML
    const xmlDoc = loadXMLDoc(xmlFilePath);

    // Пополняем список выбора с годами
    populateSeasonDropdown(xmlDoc);

    // Получаем тело таблицы по ID
    const tableBody = document.getElementById('table-body');
    
    // Очищаем текущие строки в таблице
    tableBody.innerHTML = '';

    // Получаем все элементы 'club' из XML
    const clubes = xmlDoc.getElementsByTagName('club');

    // Проходим по каждому элементу 'club' и обновляем таблицу
    for (let i = 0; i < clubes.length; i++) {
        const club = clubes[i];
        const temporadaId = club.closest('temporada').getAttribute('id');

        // Проверяем, соответствует ли элемент 'club' выбранному году
        if (temporadaId === selectedSeason || selectedSeason === 'Choose a Temporada') {
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
}

// Слушатель изменения значения в списке выбора
document.getElementById('countries').addEventListener('change', function() {
    const selectedSeason = this.value;
    updateTableData(selectedSeason);
});

// Вызываем функцию updateTableData при загрузке страницы
window.onload = function() {
    const defaultSelectedSeason = 'Choose a Temporada';
    updateTableData(defaultSelectedSeason);
};
