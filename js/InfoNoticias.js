document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр 'noticia' из URL
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('noticia');

    // Загружаем XML и обновляем данные для выбранной команды
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Вызываем функцию обновления информации
            updateNoticiaInfo(xmlDoc, noticiaId);
        });
});

function updateNoticiaInfo(xmlDoc, noticiaId) {

    const noticiaElement = xmlDoc.querySelector(`news[id="${noticiaId}"]`);
    console.log(noticiaId);

    if (noticiaElement) {
    // Получаем элементы раздела из XML
    const newsImageElement = noticiaElement.querySelector('NoticiasFoto');
    const newsTitleElement = noticiaElement.querySelector('NoticiasTitle');
    const newsPrimeroTextElement = noticiaElement.querySelector('PrimeroText');
    const newsSegundoTextElement = noticiaElement.querySelector('SegundoText');
    const newsTerseroTextElement = noticiaElement.querySelector('TerseroText');
    const newsCuartoTextElement = noticiaElement.querySelector('CuartoText');

    document.getElementById('NoticiasFoto').src = newsImageElement.textContent;
    document.getElementById('NoticiasTitle').textContent = newsTitleElement.textContent;
    document.getElementById('PrimeroText').textContent = newsPrimeroTextElement.textContent;
    document.getElementById('SegundoText').textContent = newsSegundoTextElement.textContent;
    document.getElementById('TerseroText').textContent = newsTerseroTextElement.textContent;
    document.getElementById('CuartoText').textContent = newsCuartoTextElement.textContent;
    } else {
        // Если команда не найдена, выводим сообщение об ошибке в консоль
        console.error(`Команда с идентификатором ${noticiaId} не найдена.`);
    }
}