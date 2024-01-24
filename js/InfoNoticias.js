document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр 'club' из URL
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('noticia');

    // Выводим параметры в консоль (для отладки)
    console.log('URL параметры:', params);
    console.log('ID выбранного клуба:', noticiaId);

    // Загружаем XML и обновляем данные для выбранной команды
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Вызываем функцию обновления информации о клубе
            updateClubInfo(xmlDoc, noticiaId);
        });
});

async function loadAndDisplaySection(sectionId) {

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
