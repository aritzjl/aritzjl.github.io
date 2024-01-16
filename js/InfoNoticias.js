const xmlFilePath = '/XMLyXSD/XMLInfoNoticias.xml';

// Функция для загрузки XML-файла
function loadXMLDoc(filename) {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // Для IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

// Функция для изменения информации о новости из XML-файла
function changeNewsInfoFromXML() {
    // Загружаем XML-файл
    const xmlDoc = loadXMLDoc(xmlFilePath);

    // Получаем элементы новости из XML
    const newsTitleElement = xmlDoc.querySelector('NoticiasTitle');
    const newsImageElement = xmlDoc.querySelector('NoticiasFoto');
    const newsTextElement = xmlDoc.querySelector('newsText');
    const newsPrimeroTextElement = xmlDoc.querySelector('PrimeroText');
    const newsSegundoTextElement = xmlDoc.querySelector('SegundoText');
    const newsTerseroTextElement = xmlDoc.querySelector('TerseroText');
    const newsCuartoTextElement = xmlDoc.querySelector('CuartoText');

    // Заменяем информацию
    const newText = newsTextElement.textContent;
    const newTitle = newsTitleElement.textContent;
    const newImageSrc = newsImageElement.textContent;
    const PrimeroText = newsPrimeroTextElement.textContent;
    const SegundoText = newsSegundoTextElement.textContent;
    const TerseroText = newsTerseroTextElement.textContent;
    const CuartoText = newsCuartoTextElement.textContent;

    const textElement = document.getElementById('newsText');
    const titleElement = document.getElementById('NoticiasTitle');
    const imageElement = document.getElementById('NoticiasFoto');
    const PrimeroTextElement = document.getElementById('PrimeroText');
    const SegundoTextElement = document.getElementById('SegundoText');
    const TerseroTextElement = document.getElementById('TerseroText');
    const CuartoTextElement = document.getElementById('CuartoText');



    titleElement.textContent = newTitle;
    PrimeroTextElement.textContent = PrimeroText;
    SegundoTextElement.textContent = SegundoText;
    TerseroTextElement.textContent = TerseroText;
    CuartoTextElement.textContent = CuartoText;
    imageElement.src = newImageSrc;
    imageElement.alt = 'Imagen de la Noticia';
    textElement.textContent = newText;
}

// Вызываем функцию изменения информации из XML-файла
changeNewsInfoFromXML();