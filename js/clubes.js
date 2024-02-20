// Ruta del archivo XML
const xmlFilePath = '/XMLyXSD/XMLClubes.xml';

// Función para cargar un archivo XML
function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        var xhttp = new XMLHttpRequest();
    } else {
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", filename, false);
    xhttp.send();

    return xhttp.responseXML;
}

function populateSeasonDropdown(xmlDoc) {
    const selectElement = document.getElementById('countries');
    selectElement.innerHTML = ''; // Очищаем список выбора

    const temporadas = xmlDoc.getElementsByTagName('temporada');

    for (let i = 0; i < temporadas.length; i++) {
        const temporada = temporadas[i];
        const temporadaId = temporada.getAttribute('id');

        const optionElement = document.createElement('option');
        optionElement.value = temporadaId;
        optionElement.text = temporadaId;
        selectElement.add(optionElement);
    }
}

function updateTableData(selectedSeason) {
    // Загружаем XML-документ
    const xmlDoc = loadXMLDoc(xmlFilePath);

    // Заполняем выпадающий список сезонов
    populateSeasonDropdown(xmlDoc);

    const selectElement = document.getElementById('countries');

    // Проверяем, есть ли актуальный год (2024) в XML
    const temporadas = xmlDoc.getElementsByTagName('temporada');
    let hasCurrentYear = false;
    for (let i = 0; i < temporadas.length; i++) {
        const temporada = temporadas[i];
        const temporadaId = temporada.getAttribute('id');
        if (temporadaId === '2024') {
            hasCurrentYear = true;
            break;
        }
    }

    if (!hasCurrentYear) {
        // Если актуального года нет в XML, очищаем список выбора и завершаем функцию
        selectElement.innerHTML = '<option selected>Choose a Temporada</option>';
        return;
    }

    // Устанавливаем значение по умолчанию в выпадающем списке на "2024"
    selectElement.value = '2024';

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    const clubes = xmlDoc.getElementsByTagName('club');

    for (let i = 0; i < clubes.length; i++) {
        const club = clubes[i];
        const temporadaId = club.closest('temporada').getAttribute('id');

        if (temporadaId === selectedSeason) {
            const nombre = club.getElementsByTagName('nombre')[0].textContent;
            const estadio = club.getElementsByTagName('estadio')[0].textContent;
            const presidente = club.getElementsByTagName('presidente')[0].textContent;
            const cantidadSocios = club.getElementsByTagName('cantidadSocios')[0].textContent;
            const ciudad = club.getElementsByTagName('ciudad')[0].textContent;
            const codigo = club.getElementsByTagName('codigo')[0].textContent;

            const newRow = document.createElement('tr');
            newRow.className = i % 2 === 0 ? ' dark:border-gray-700' : '';

            newRow.addEventListener('click', function() {
                const clubInfo = {
                    nombre: nombre,
                    estadio: estadio,
                    presidente: presidente,
                    cantidadSocios: cantidadSocios,
                    ciudad: ciudad,
                    codigo: codigo
                };

                const clubInfoJSON = encodeURIComponent(JSON.stringify(clubInfo));
                window.location.href = `PrimeroClub.html?clubInfo=${clubInfoJSON}`;
            });

            newRow.innerHTML = `
                <td class="px-6 py-4"><img src="/imagenes/Spirit.png" alt="Escudo Equipo" class="h-8"></td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${nombre}</td>
                <td class="px-6 py-4">${estadio}</td>
                <td class="px-6 py-4">${presidente}</td>
                <td class="px-6 py-4">${cantidadSocios}</td>
                <td class="px-6 py-4">${ciudad}</td>
            `;
        
            tableBody.appendChild(newRow);
        }
    }
}

window.onload = function() {
    const defaultSelectedSeason = '2024'; // Задаем 2024 год по умолчанию
    updateTableData(defaultSelectedSeason);
};


document.getElementById('countries').addEventListener('change', function() {
    const selectedSeason = this.value;
    updateTableData(selectedSeason);
    
    // Получаем все опции в списке выбора года
    const options = this.options;
    // Проходимся по каждой опции
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        // Если значение опции совпадает с выбранным годом, устанавливаем для нее атрибут selected
        if (option.value === selectedSeason) {
            option.setAttribute('selected', 'selected');
        } else {
            // Иначе убираем атрибут selected
            option.removeAttribute('selected');
        }
    }
});