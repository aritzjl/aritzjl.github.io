const xmlFilePath = '/XMLyXSD/XMLClasificacion.xml';

        // Функция для загрузки XML-файла
        function loadXMLDoc(filename) {
            if (window.XMLHttpRequest) {
                var xhttp = new XMLHttpRequest();
            } else {
                // Для IE6, IE5
                var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhttp.open("GET", filename, false);
            xhttp.send();
            return xhttp.responseXML;
        }

        // Функция для динамического заполнения таблицы данными из XML
        function loadTableData() {
            const xmlDoc = loadXMLDoc(xmlFilePath);
            const tableBody = document.getElementById('table-body');

            const teams = xmlDoc.getElementsByTagName('team');
            for (let i = 0; i < teams.length; i++) {
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

                const newRow = document.createElement('tr');
                newRow.className = i % 2 === 0 ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700' : '';

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

                tableBody.appendChild(newRow);
            }
        }

        window.onload = loadTableData;