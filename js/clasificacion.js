// Ruta del archivo XML
const xmlFilePath = '/XMLyXSD/clasificacion.xml';

// Функция для загрузки XML-документа
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

// Функция для вычисления очков команды
function calculatePoints(ganados, empatados) {
    return (ganados * 3) + empatados;
}

function calculateJugados(ganados, perdidos, empatados) {
    return ganados + perdidos + empatados;
}

// Функция для загрузки данных в таблицу из XML
function loadTableData(selectedSeason) {
    const xmlDoc = loadXMLDoc(xmlFilePath);

    populateSeasonDropdown(xmlDoc);

    const selectElement = document.getElementById('countries');

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
        selectElement.innerHTML = '<option selected>Choose a Temporada</option>';
        return;
    }

    selectElement.value = '2024';

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    const teams = xmlDoc.getElementsByTagName('team');
    const teamsData = [];

    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const temporadaId = team.closest('temporada').getAttribute('id');

        if (temporadaId === selectedSeason) {
            const nomEq = team.getElementsByTagName('nomEq')[0].textContent;
            const ganados = parseInt(team.getElementsByTagName('ganados')[0].textContent);
            const perdidos = parseInt(team.getElementsByTagName('perdidos')[0].textContent);
            const empatados = parseInt(team.getElementsByTagName('empatados')[0].textContent);
            const golesF = team.getElementsByTagName('goles_f')[0].textContent;
            const golesC = team.getElementsByTagName('goles_c')[0].textContent;
            const puntos = calculatePoints(ganados, empatados);
            const jugados = calculateJugados(ganados, perdidos, empatados);

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
        // Сортируем команды по количеству очков и разнице в голах (по убыванию)
teamsData.sort((a, b) => {
    if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos; // Сортировка по количеству очков
    } else {
        // Если очки одинаковые, сравниваем разницу в голах
        const diferenciaGolesA = a.golesF - a.golesC;
        const diferenciaGolesB = b.golesF - b.golesC;
        return diferenciaGolesB - diferenciaGolesA; // Учитываем разницу в голах
    }
});
    }

    // Сортируем команды по количеству очков (по убыванию)
    teamsData.sort((a, b) => b.puntos - a.puntos);

    // Добавляем отсортированные команды в таблицу
    for (let i = 0; i < teamsData.length; i++) {
        const teamData = teamsData[i];

        const newRow = document.createElement('tr');
        newRow.className = i % 2 === 0 ? ' dark:border-gray-700' : '';

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

        tableBody.appendChild(newRow);
    }
}

// Функция для загрузки выпадающего списка сезонов
function populateSeasonDropdown(xmlDoc) {
    const selectElement = document.getElementById('countries');
    selectElement.innerHTML = '';

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

// Функция loadTableData будет выполнена при полной загрузке окна
window.onload = function() {
    const defaultSelectedSeason = '2024'; // Задаем 2024 год по умолчанию
    loadTableData(defaultSelectedSeason);
};

// Функция loadTableData будет выполнена при изменении значения в выпадающем списке
document.getElementById('countries').addEventListener('change', function() {
    const selectedSeason = this.value;
    loadTableData(selectedSeason);
    
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