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

function updateTableData(selectedSeason) {
    const xmlDoc = loadXMLDoc(xmlFilePath);
    populateSeasonDropdown(xmlDoc);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    const clubes = xmlDoc.getElementsByTagName('club');

    const selectElement = document.getElementById('countries');
    const defaultOption = selectElement.querySelector('option[selected]');
    defaultOption.textContent = selectedSeason;

    if (selectedSeason === 'Choose a Temporada') {
        return; // Не отображаем информацию при пустом значении Temporada
    }

    for (let i = 0; i < clubes.length; i++) {
        const club = clubes[i];
        const temporadaId = club.closest('temporada').getAttribute('id');

        if (temporadaId === selectedSeason) {
            const escudo = club.getElementsByTagName('escudo')[0].textContent;
            const nombre = club.getElementsByTagName('nombre')[0].textContent;
            const estadio = club.getElementsByTagName('estadio')[0].textContent;
            const presidente = club.getElementsByTagName('presidente')[0].textContent;
            const cantidadSocios = club.getElementsByTagName('cantidadSocios')[0].textContent;
            const ciudad = club.getElementsByTagName('ciudad')[0].textContent;
            const historia = club.getElementsByTagName('historia')[0].textContent;
            const codigo = club.getElementsByTagName('codigo')[0].textContent;

            const newRow = document.createElement('tr');
            newRow.className = i % 2 === 0 ? ' dark:border-gray-700' : '';

            newRow.addEventListener('click', function() {
                const clubInfo = {
                    escudo: escudo,
                    nombre: nombre,
                    estadio: estadio,
                    presidente: presidente,
                    cantidadSocios: cantidadSocios,
                    ciudad: ciudad,
                    historia: historia,
                    codigo: codigo
                };

                const clubInfoJSON = encodeURIComponent(JSON.stringify(clubInfo));
                window.location.href = `PrimeroClub.html?clubInfo=${clubInfoJSON}`;
            });

            newRow.innerHTML = `
                <td class="px-6 py-4"><img src="${escudo}" alt="Escudo Equipo" class="h-8"></td>
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


document.getElementById('countries').addEventListener('change', function() {
    const selectedSeason = this.value;
    updateTableData(selectedSeason);
});

window.onload = function() {
    const defaultSelectedSeason = 'Choose a Temporada';
    updateTableData(defaultSelectedSeason);
};
