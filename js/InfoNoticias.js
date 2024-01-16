const xmlFilePath = '';

        // Функция для загрузки XML-файла
        function loadXMLDoc(filename) {
            if (window.XMLHttpRequest) {
                var xhttp = new XMLHttpRequest();
            } else {
                // Для IE6, IE5
                var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhttp.open("GET", filename, false);
            xhttp.send();
            return xhttp.responseXML;
        }
// Функция для изменения информации о новости
        function changeNewsInfo() {
            // Получаем элементы по их идентификаторам
            const newsTitleElement = document.getElementById('newsTitle');
            const newsImageElement = document.getElementById('newsImage');
            const newsTextElement = document.getElementById('newsText');

            // Заменяем информацию
            newsTitleElement.textContent = 'Nuevo Título de la Noticia';
            newsImageElement.src = 'nueva_imagen.jpg';
            newsImageElement.alt = 'Nueva Imagen de la Noticia';
            newsTextElement.textContent = 'Nuevo Texto de la Noticia';
        }

        // Вызываем функцию изменения информации
        changeNewsInfo();