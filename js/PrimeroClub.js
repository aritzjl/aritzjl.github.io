document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр из URL
    const params = new URLSearchParams(window.location.search);
    const clubId = params.get('club');
    console.log(params);
    console.log('clubId:', clubId);

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
        // картинка
        const escudoElement = clubElement.querySelector('escudo');
        //код
        const codigoElement = clubElement.querySelector('codigo');
        //имя
        const nombreElement = clubElement.querySelector('nombre');
        //басейн
        const estadioElement = clubElement.querySelector('estadio');
        //имя президента
        const presidenteElement = clubElement.querySelector('presidente');
        //год начала
        const fundacionElement = clubElement.querySelector('fundacion');
        //город
        const ciudadElement = clubElement.querySelector('ciudad');
        //количество игроков
        const cantidadElement = clubElement.querySelector('cantidad');
        //история
        const historiaElement = clubElement.querySelector('historia');

        // Обновляем информацию на странице
        // картинка
        document.getElementById('escudo').src = escudoElement.textContent;
        //код
        document.getElementById('codigo').textContent = codigoElement.textContent;
        //имя
        document.getElementById('nombre').textContent = nombreElement.textContent;
        //басейн
        document.getElementById('estadio').textContent = estadioElement.textContent;
        //имя президента
        document.getElementById('presidente').textContent = presidenteElement.textContent;
        //год начала
        document.getElementById('fundacion').textContent = fundacionElement.textContent;
        //город
        document.getElementById('ciudad').textContent = ciudadElement.textContent;
        //количество игроков
        document.getElementById('cantidad').textContent = cantidadElement.textContent;
        //история
        document.getElementById('historia').textContent = historiaElement.textContent
        
    } else {
        // Если команда не найдена, можно отобразить сообщение об ошибке или перенаправить на другую страницу.
        console.error(`Команда с идентификатором ${clubId} не найдена.`);
        // Например, можно перенаправить на страницу ошибки
        // window.location.href = '/error.html';
    }
}
