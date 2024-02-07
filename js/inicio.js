// Ruta del archivo XML
const xmlFilePath = '/XMLyXSD/XMLInicio.xml';

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

// Функция для обновления данных на странице
function updateTableData() {
    // Загрузка XML файла
    const xmlDoc = loadXMLDoc(xmlFilePath);

    // Получение списка всех элементов <club>
    const clubElements = xmlDoc.getElementsByTagName('club');

    // Обновление данных для каждого <club> элемента
    for (let i = 0; i < clubElements.length; i++) {
        const club = clubElements[i];
        const clubIndex = i + 1;

        // Получение данных из XML
        const escudo = club.querySelector('escudo').textContent;
        const codigo = club.querySelector('codigo').textContent;
        const nombre = club.querySelector('nombre').textContent;
        const estadio = club.querySelector('estadio').textContent;
        const presidente = club.querySelector('presidente').textContent;
        const cantidadSocios = club.querySelector('cantidadSocios').textContent;

        // Обновление содержимого элементов на странице HTML
        document.getElementById(`escudo${clubIndex}`).src = escudo;
        document.getElementById(`codigo${clubIndex}`).textContent = codigo;
        document.getElementById(`nombre${clubIndex}`).textContent = nombre;
        document.getElementById(`estadio${clubIndex}`).textContent = estadio;
        document.getElementById(`presidente${clubIndex}`).textContent = presidente;
        document.getElementById(`cantidad${clubIndex}`).textContent = cantidadSocios;
    }
}

// Вызов функции для обновления данных при загрузке страницы
updateTableData();
