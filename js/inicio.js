document.addEventListener('DOMContentLoaded', function () {
    // Загружаем XML и обновляем данные для первого клуба
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            updateClubInfo(xmlDoc, 'club1', 'escudo1', 'codigo1', 'nombre1', 'estadio1', 'presidente1', 'cantidad1');
        });

    // Загружаем XML и обновляем данные для второго клуба
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            updateClubInfo(xmlDoc, 'club2', 'escudo2', 'codigo2', 'nombre2', 'estadio2', 'presidente2', 'cantidad2');
        });

    // Загружаем XML и обновляем данные для третьего клуба
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            updateClubInfo(xmlDoc, 'club3', 'escudo3', 'codigo3', 'nombre3', 'estadio3', 'presidente3', 'cantidad3');
        });
});

function updateClubInfo(xmlDoc, clubId, escudoId, codigoId, nombreId, estadioId, presidenteId, cantidadId) {
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
        //количество игроков
        const cantidadElement = clubElement.querySelector('cantidad');

        // Обновляем информацию на странице
        // картинка
        document.getElementById(escudoId).src = escudoElement.textContent;
        //код
        document.getElementById(codigoId).textContent = codigoElement.textContent;
        //имя
        document.getElementById(nombreId).textContent = nombreElement.textContent;
        //басейн
        document.getElementById(estadioId).textContent = estadioElement.textContent;
        //имя президента
        document.getElementById(presidenteId).textContent = presidenteElement.textContent;
        //количество игроков
        document.getElementById(cantidadId).textContent = cantidadElement ? cantidadElement.textContent : "N/A";
    } else {
        // Если команда не найдена, можно отобразить сообщение об ошибке или перенаправить на другую страницу.
        console.error(`Команда с идентификатором ${clubId} не найдена.`);
        // Например, можно перенаправить на страницу ошибки
        // window.location.href = '/error.html';
    }
}
