document.addEventListener('DOMContentLoaded', function () {
    // Загружаем XML и обновляем таблицу
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Обновляем таблицу с данными о клубах
            updateTable(xmlDoc);
        });
});

function updateInformationFromXML() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the XML response
            var xmlDoc = xhr.responseXML;
            
            // Get all 'a' elements in the HTML
            var newsElements = document.querySelectorAll('.flex.flex-wrap.justify-center a');
            
            // Loop through each 'a' element and update information
            newsElements.forEach(function(newsElement, index) {
                var newsId = "noticia" + (index + 1);
                var nameId = "NameNoticias" + (index + 1);
                var newsLittleId = "NewsLittle" + (index + 1);
                var imageId = "image" + (index + 1);

                // Get data from XML based on element index
                var newsData = xmlDoc.querySelector('noticia[id="' + newsId + '"]');
                var name = newsData.querySelector('name').textContent;
                var newsLittle = newsData.querySelector('newsLittle').textContent;
                var imageUrl = newsData.querySelector('imageUrl').textContent;

                // Update HTML content
                newsElement.setAttribute('href', '/InfoNoticias.html?noticia=' + newsId);
                newsElement.querySelector('h5').textContent = name;
                newsElement.querySelector('p').textContent = newsLittle;
                newsElement.querySelector('img').setAttribute('src', imageUrl);
            });
        }
    };

    // Open and send the request to the XML file
    xhr.open('GET', 'your-xml-file.xml', true);
    xhr.send();
}