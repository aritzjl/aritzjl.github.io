document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired.'); // Проверка события DOMContentLoaded

    // Находим все кнопки
    const newsButtons = document.querySelectorAll('a[id^="noticia"]');
    console.log('Section loaded and displayed successfully.');
    console.log(newsButtons);

    // Добавляем обработчик события для каждой кнопки
    newsButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // Предотвращаем стандартное действие перехода по ссылке
            event.preventDefault();
            
            // Извлекаем значение 'xml' из атрибута href
            const sectionId = button.getAttribute('href').split('=')[1];

            // Загружаем XML-документ и обрабатываем его
            loadAndDisplaySection(sectionId);
        });
    });
    console.log('Section loaded and displayed successfully.');
    console.log(sectionId);
});
console.log('Section loaded and displayed successfully.');
async function loadAndDisplaySection(sectionId) {
    console.log('Attempting to load XML document:');

    try {
        const xmlDoc = await loadXMLDoc(`/XMLyXSD/XMLInfoNoticias.xml#${sectionId}`);

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
} catch (error) {
    console.log('XML Document loading error:', error);
}
}
function loadXMLDoc(filename) {
    console.log('Section loaded and displayed successfully.');
    // Используйте XMLHttpRequest или fetch для загрузки внешнего XML-файла
    // Пример с использованием fetch:
    return fetch(filename)
        .then(response => response.text())
        .then(data => new DOMParser().parseFromString(data, 'application/xml'));
}