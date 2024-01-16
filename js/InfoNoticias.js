document.addEventListener('DOMContentLoaded', function () {
    // Находим все кнопки
    const newsButtons = document.querySelectorAll('a[id^="noticia"]');

    // Добавляем обработчик события для каждой кнопки
    newsButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // Предотвращаем стандартное действие перехода по ссылке
            event.preventDefault();

            // Извлекаем значение 'xml' из атрибута href
            const xmlParam = button.getAttribute('href').split('=')[1];

            // Загружаем XML-документ и обрабатываем его
            loadAndDisplaySection(xmlParam);
        });
    });
});

function loadAndDisplaySection(sectionId) {
    const xmlDoc = loadXMLDoc(`/XMLyXSD/XMLInfoNoticias.xml#${sectionId}`);

    // Получаем элементы раздела из XML
    const newsTitleElement = xmlDoc.querySelector('NoticiasTitle');
    const newsImageElement = xmlDoc.querySelector('NoticiasFoto');
    const newsPrimeroTextElement = xmlDoc.querySelector('PrimeroText');
    const newsSegundoTextElement = xmlDoc.querySelector('SegundoText');
    const newsTerseroTextElement = xmlDoc.querySelector('TerseroText');
    const newsCuartoTextElement = xmlDoc.querySelector('CuartoText');

    // Заменяем информацию
    const titleElement = document.getElementById('NoticiasTitle');
    const imageElement = document.getElementById('NoticiasFoto');
    const PrimeroTexto = document.getElementById('PrimeroText');
    const SegundoTexto = document.getElementById('SegundoText');
    const TerseroTexto = document.getElementById('TerseroText');
    const CuartoTexto = document.getElementById('CuartoText');

    titleElement.textContent = newsTitleElement.textContent;
    imageElement.src = newsImageElement.textContent;
    imageElement.alt = 'Imagen de la Noticia';
    PrimeroTexto.textContent = newsPrimeroTextElement.textContent;
    SegundoTexto.textContent = newsSegundoTextElement.textContent;
    TerseroTexto.textContent = newsTerseroTextElement.textContent;
    CuartoTexto.textContent = newsCuartoTextElement.textContent;
}

function loadXMLDoc(filename) {
    // Используйте XMLHttpRequest или fetch для загрузки внешнего XML-файла
    // Пример с использованием fetch:
    return fetch(filename)
        .then(response => response.text())
        .then(data => new DOMParser().parseFromString(data, 'application/xml'));
}