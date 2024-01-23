document.addEventListener('DOMContentLoaded', function () {
    // Загружаем XML и обновляем таблицу
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Обновляем таблицу с данными о новостях
            updateTable(xmlDoc);
        })
        .catch(error => console.error('Error fetching XML:', error));
});

function updateTable(xmlDoc) {
    // Проходим по всем новостям в XML
    for (let i = 1; i <= 9; i++) {
        // Получаем элемент новости из XML
        const NoticiaElement = xmlDoc.querySelector(`news[id="noticia${i}"]`);

        if (NoticiaElement) { // Проверяем, что элемент существует
            // Получаем необходимые элементы данных о новости
            const NameElement = NoticiaElement.querySelector('NameNoticias');
            const imageElement = NoticiaElement.querySelector('NoticiasFoto');
            const NewsLittleElement = NoticiaElement.querySelector('NewsLittle');

            // Получаем соответствующие элементы HTML на странице
            const image = document.getElementById(`NoticiasFoto${i}`);
            const nombre = document.getElementById(`NameNoticias${i}`);
            const NewsLittle = document.getElementById(`NewsLittle${i}`);

            // Обновляем содержимое элементов HTML данными из XML
            if (imageElement) {
                image.src = imageElement.textContent;
            }

            if (NameElement) {
                nombre.textContent = NameElement.textContent;
            }

            if (NewsLittleElement) {
                NewsLittle.textContent = NewsLittleElement.textContent;
            }
        }

        // Добавляем обработку для элементов с id, начинающимися на "noticiaFast"
        const NoticiaFastElement = xmlDoc.querySelector(`news[id^="noticiaFast${i}"]`);

        if (NoticiaFastElement) { // Проверяем, что элемент существует
            // Получаем необходимые элементы данных о новости
            const NameFNotElement = NoticiaFastElement.querySelector('NameFNot');
            const imageFElement = NoticiaFastElement.querySelector('image');
            const NewsFLitElement = NoticiaFastElement.querySelector('NewsFLit');

            // Получаем соответствующие элементы HTML на странице
            const imageF = document.getElementById(`image${i}`);
            const nombreF = document.getElementById(`NameFNot${i}`);
            const NewsFLit = document.getElementById(`NewsFLit${i}`);

            // Обновляем содержимое элементов HTML данными из XML
            if (imageFElement) {
                imageF.src = imageFElement.textContent;
            }

            if (NameFNotElement) {
                nombreF.textContent = NameFNotElement.textContent;
            }

            if (NewsFLitElement) {
                NewsFLit.textContent = NewsFLitElement.textContent;
            }
        }
    }
}


function navigateToNoticiasPage(NoticiaUrl) {
    window.location.href = NoticiaUrl;
}