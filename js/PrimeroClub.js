// PrimeroClub.js
document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр из URL
    const params = new URLSearchParams(window.location.search);
    const clubId = params.get('club');

    // Загружаем XML и обновляем данные для выбранной команды
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            updateClubInfo(xmlDoc, clubId);
        });
});

function updateClubInfo(xmlDoc, clubId) {
    // Получаем элементы для выбранной команды
    const clubElement = xmlDoc.querySelector(clubId);
    const escudoElement = clubElement.querySelector('escudo');
    const nombreElement = clubElement.querySelector('nombre');
    const estadioElement = clubElement.querySelector('estadio');
    const presidenteElement = clubElement.querySelector('presidente');
    const fundacionElement = clubElement.querySelector('fundacion');
    const ciudadElement = clubElement.querySelector('ciudad');

    // Обновляем информацию на странице
    document.getElementById('escuro').src = escudoElement.textContent;
    document.getElementById('nombre').textContent = nombreElement.textContent;
    document.getElementById('estadio').textContent = estadioElement.textContent;
    document.getElementById('presidente').textContent = presidenteElement.textContent;
    document.getElementById('fundacion').textContent = fundacionElement.textContent;
    document.getElementById('ciudad').textContent = ciudadElement.textContent;
}
