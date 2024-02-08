document.addEventListener('DOMContentLoaded', function () {
    // Получить параметры 'Jornadas' и 'Temporada' из URL
    const params = new URLSearchParams(window.location.search);

    const Jornada = params.get('Jornadas');
    const Temporada = params.get('Temporada');

    // Загрузить XML-файл и обновить данные для выбранного сезона
    fetch('/XMLyXSD/XMLJornadas.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Вызвать функцию для обновления информации о туре и годе
            updateJornadaInfo(xmlDoc, Jornada, Temporada);
        });
});

// Функция для обновления информации о туре и годе на странице
function updateJornadaInfo(xmlDoc, Jornada, Temporada) {
    console.log(`Год: ${Temporada}`);
    console.log(`Тур: ${Jornada}`);

    // Получить элемент года из XML-файла по указанному году
    const TemporadaElement = xmlDoc.querySelector(`Temporada[id="${Temporada}"]`);
    if (TemporadaElement) {
        // Получить элемент тура внутри года по указанному туру
        const JornadaElement = TemporadaElement.querySelector(`Jornada[id="${Jornada}"]`);
        console.log(JornadaElement);
        if (JornadaElement) {
            // Итерировать по матчам тура
            const partidos = JornadaElement.querySelectorAll('Partido');
            partidos.forEach((partido, i) => {
                // Получить соответствующие элементы из XML
                const fotcaLocalElement = partido.querySelector('fotcaLocal');
                const fotcaVisitanteElement = partido.querySelector('fotcaVisitante');
                const nomEquipoLocalElement = partido.querySelector('nomEquipoLocal');
                const nombreEquipoVisitanteElement = partido.querySelector('nombreEquipoVisitante');
                const etiquetaPartidoElement = partido.querySelector('etiquetaPartido');
                const resultadoLocalElement = partido.querySelector('resultadoLocal');
                const resultadoVisitanteElement = partido.querySelector('resultadoVisitante');

                // Получить соответствующие HTML-элементы на странице
                const fotcaLocal = document.getElementById(`fotcaLocal${i + 1}`);
                const fotcaVisitante = document.getElementById(`fotcaVisitante${i + 1}`);
                const nomEquipoLocal = document.getElementById(`nomEquipoLocal${i + 1}`);
                const nombreEquipoVisitante = document.getElementById(`nombreEquipoVisitante${i + 1}`);
                const etiquetaPartido = document.getElementById(`etiquetaPartido${i + 1}`);
                const resultadoLocal = document.getElementById(`resultadoLocal${i + 1}`);
                const resultadoVisitante = document.getElementById(`resultadoVisitante${i + 1}`);

                // Обновить HTML-элементы данными о матче
                if (fotcaLocal && fotcaVisitante && nomEquipoLocal && nombreEquipoVisitante && etiquetaPartido && resultadoLocal && resultadoVisitante) {
                    fotcaLocal.src = fotcaLocalElement.textContent;
                    fotcaVisitante.src = fotcaVisitanteElement.textContent;
                    nomEquipoLocal.textContent = nomEquipoLocalElement.textContent;
                    nombreEquipoVisitante.textContent = nombreEquipoVisitanteElement.textContent;
                    etiquetaPartido.textContent = etiquetaPartidoElement.textContent;
                    resultadoLocal.textContent = resultadoLocalElement.textContent;
                    resultadoVisitante.textContent = resultadoVisitanteElement.textContent;
                }
            });
        } else {
            console.log("Неправильный номер тура");
        }
    } else {
        console.log("Неправильный год");
    }
}