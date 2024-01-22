document.addEventListener('DOMContentLoaded', function () {
    // Загружаем XML и обновляем таблицу
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Обновляем таблицу с данными о клубах
            updateTable(xmlDoc);
        });
});

// Функция для обновления таблицы с данными о клубах
function updateTable(xmlDoc) {
    // Проходим по всем клубам (в данном случае, от 1 до 6)
    for (let i = 1; i <= 6; i++) {
        // Получаем элемент клуба из XML
        const clubElement = xmlDoc.querySelector(`club${i}`);
        
        // Получаем необходимые элементы данных о клубе
        const escudoElement = clubElement.querySelector('escudo');
        const nombreElement = clubElement.querySelector('nombre');
        const estadioElement = clubElement.querySelector('estadio');
        const presidenteElement = clubElement.querySelector('presidente');
        const fundacionElement = clubElement.querySelector('fundacion');
        const ciudadElement = clubElement.querySelector('ciudad');

        // Получаем соответствующие элементы HTML на странице
        const image = document.getElementById(`image${i}`);
        const nombre = document.getElementById(`nombre${i}`);
        const estadio = document.getElementById(`estadio${i}`);
        const presidente = document.getElementById(`presidente${i}`);
        const fundacion = document.getElementById(`fundacion${i}`);
        const ciudad = document.getElementById(`ciudad${i}`);

        // Обновляем содержимое элементов HTML данными из XML
        image.src = escudoElement.textContent;
        nombre.textContent = nombreElement.textContent;
        estadio.textContent = estadioElement.textContent;
        presidente.textContent = presidenteElement.textContent;
        fundacion.textContent = fundacionElement.textContent;
        ciudad.textContent = ciudadElement.textContent;
    }
}

// Функция для перехода на страницу клуба
function navigateToClubPage(clubUrl) {
    window.location.href = clubUrl;
}