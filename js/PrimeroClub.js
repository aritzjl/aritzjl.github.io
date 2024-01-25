document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр 'club' из URL
    const params = new URLSearchParams(window.location.search);
    const clubId = params.get('club');

    // Загружаем XML и обновляем данные для выбранной команды
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Вызываем функцию обновления информации о клубе
            updateClubInfo(xmlDoc, clubId);
        });
});

// Функция для обновления информации о клубе на странице
function updateClubInfo(xmlDoc, clubId) {
    // Получаем элементы для выбранной команды
    const clubElement = xmlDoc.querySelector(clubId);

    if (clubElement) { // Проверяем, что команда существует
        // Получаем элементы информации о клубе
        const escudoElement = clubElement.querySelector('escudo');
        const codigoElement = clubElement.querySelector('codigo');
        const nombreElement = clubElement.querySelector('nombre');
        const estadioElement = clubElement.querySelector('estadio');
        const presidenteElement = clubElement.querySelector('presidente');
        const cantidadElement = clubElement.querySelector('cantidad');
        const historiaElement = clubElement.querySelector('historia');
 
        // Обновляем информацию на странице
        document.getElementById('escudo').src = escudoElement.textContent;
        document.getElementById('codigo').textContent = codigoElement.textContent;
        document.getElementById('nombre').textContent = nombreElement.textContent;
        document.getElementById('estadio').textContent = estadioElement.textContent;
        document.getElementById('presidente').textContent = presidenteElement.textContent;
        document.getElementById('cantidad').textContent =cantidadElement.textContent;
        document.getElementById('historia').textContent = historiaElement.textContent;
    } 
}
