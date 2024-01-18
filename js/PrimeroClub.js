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

    if (clubElement) { // Проверяем, что команда существует
        const escudoElement = clubElement.querySelector('escudo');
        const nombreElement = clubElement.querySelector('nombre');
        const estadioElement = clubElement.querySelector('estadio');
        const presidenteElement = clubElement.querySelector('presidente');
        const fundacionElement = clubElement.querySelector('fundacion');
        const ciudadElement = clubElement.querySelector('ciudad');
        const historiaElement = clubElement.querySelector('historia');

        // Обновляем информацию на странице
        document.getElementById('escudo').src = escudoElement.textContent;
        document.getElementById('nombre').textContent = nombreElement.textContent;
        document.getElementById('estadio').textContent = estadioElement.textContent;
        document.getElementById('presidente').textContent = presidenteElement.textContent;
        document.getElementById('fundacion').textContent = fundacionElement.textContent;
        document.getElementById('ciudad').textContent = ciudadElement.textContent;
        document.getElementById('historia').textContent = historiaElement.textContent;
    } else {
        // Если команда не найдена, можно отобразить сообщение об ошибке или перенаправить на другую страницу.
        console.error(`Команда с идентификатором ${clubId} не найдена.`);
        // Например, можно перенаправить на страницу ошибки
        // window.location.href = '/error.html';
    }
}
