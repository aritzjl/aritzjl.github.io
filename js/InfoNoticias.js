document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр 'noticia' из URL
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('noticia');
    const noticiaFastId = params.get('noticiaFast');

    // Загружаем XML-файл и обновляем данные для выбранной новости
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Вызываем функцию обновления информации о новости
            updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId);
        });
});

// Функция для обновления информации о новости на странице
function updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId) {
    console.log(noticiaFastId, noticiaId);
    if (noticiaFastId) {
        // Если есть идентификатор noticiaFastId
        const noticiaFastElement = xmlDoc.querySelector(`news[id="${noticiaFastId}"]`);
        console.log(noticiaFastElement);
        if (noticiaFastElement) {
            // Получаем элементы области noticiaFast из XML
            const imageFElement = noticiaFastElement.querySelector('image');
            const NameFNotElement = noticiaFastElement.querySelector('NameFNot');
            const NewsFPrimeroTElement = noticiaFastElement.querySelector('NewsFPrimeroT');
            const NewsFSegundoTElement = noticiaFastElement.querySelector('NewsFSegundoT');
            const NewsFTerseroTElement = noticiaFastElement.querySelector('NewsFTersero');
            const NewsFCuartoTElement = noticiaFastElement.querySelector('NewsFCuartoT');

            // Проверяем, что элементы существуют, прежде чем обновить HTML
            if (imageFElement && NameFNotElement && NewsFPrimeroTElement && NewsFSegundoTElement && NewsFTerseroTElement && NewsFCuartoTElement) {
                // Обновляем HTML-элементы данными noticiaFast
                document.getElementById('NoticiasFoto').src = imageFElement.textContent;
                document.getElementById('NoticiasTitle').textContent = NameFNotElement.textContent;
                document.getElementById('PrimeroText').textContent = NewsFPrimeroTElement.textContent;
                document.getElementById('SegundoText').textContent = NewsFSegundoTElement.textContent;
                document.getElementById('TerseroText').textContent = NewsFTerseroTElement.textContent;
                document.getElementById('CuartoText').textContent = NewsFCuartoTElement.textContent;

            }
        }
    } else {
        // Получаем элемент новости из XML по предоставленному идентификатору
        const noticiaElement = xmlDoc.querySelector(`news[id="${noticiaId}"]`);

        if (noticiaElement) {
            // Получаем элементы области новостей из XML
            const newsImageElement = noticiaElement.querySelector('NoticiasFoto');
            const newsTitleElement = noticiaElement.querySelector('NoticiasTitle');
            const newsPrimeroTextElement = noticiaElement.querySelector('PrimeroText');
            const newsSegundoTextElement = noticiaElement.querySelector('SegundoText');
            const newsTerseroTextElement = noticiaElement.querySelector('TerseroText');
            const newsCuartoTextElement = noticiaElement.querySelector('CuartoText');

            // Проверяем, что элементы существуют, прежде чем обновить HTML
            if (newsImageElement && newsTitleElement && newsPrimeroTextElement && newsSegundoTextElement && newsTerseroTextElement && newsCuartoTextElement) {
                // Обновляем HTML-элементы данными новости
                document.getElementById('NoticiasFoto').src = newsImageElement.textContent;
                document.getElementById('NoticiasTitle').textContent = newsTitleElement.textContent;
                document.getElementById('PrimeroText').textContent = newsPrimeroTextElement.textContent;
                document.getElementById('SegundoText').textContent = newsSegundoTextElement.textContent;
                document.getElementById('TerseroText').textContent = newsTerseroTextElement.textContent;
                document.getElementById('CuartoText').textContent = newsCuartoTextElement.textContent;
            }
        }
    }
}
