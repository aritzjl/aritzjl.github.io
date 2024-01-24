document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр 'noticia' из URL
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('noticia');
    const noticiaFastId = params.get('noticiaFast');

    // Загружаем XML и обновляем данные для выбранной команды
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Вызываем функцию обновления информации
            updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId);
        });
});

function updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId) {

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
        // Если это элемент noticiaFast
         const noticiaFastElement = xmlDoc.querySelector(`news[id="noticiaFast${i}"]`);
         console.log(noticiaFastElement);
        if (noticiaFastElement) {
             const imageFElement = noticiaFastElement.querySelector('NoticiasFoto');
             const NameFNotElement = noticiaFastElement.querySelector('NoticiasTitle');
             const NewsFLitElement = noticiaFastElement.querySelector('PrimeroText');
             

              document.getElementById('NoticiasFoto').src = imageFElement.textContent;
              document.getElementById('NoticiasTitle').textContent = NameFNotElement.textContent;
              document.getElementById('PrimeroText').textContent = NewsFLitElement.textContent;
            }
        
    }
}