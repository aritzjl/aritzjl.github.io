document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр 'Jornadas' из URL
    const params = new URLSearchParams(window.location.search);

    const Jornada = params.get('Jornadas').replace('Jornadas', '');

    // Загружаем XML и обновляем данные для выбранного сезона
    fetch('/XMLyXSD/XMLJornadas.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Вызываем функцию для обновления информации о туре
            updateJornadaInfo(xmlDoc, Jornada);
        });
});

function updateJornadaInfo(xmlDoc, Jornada) {
    console.log(Jornada);
    const jornadaElement = xmlDoc.querySelector(`Jornada${Jornada}`);
    console.log(jornadaElement);
    if (jornadaElement) {
        for (let i = 1; i <= 3; i++) {
            const partidos = jornadaElement.querySelectorAll(`Partido${i}`);

            if (partidos) {

                partidos.forEach((partido, index) => {
                    const fotcaLocalElement = partido.querySelector('fotcaLocal');
                    const fotcaVisitanteElement = partido.querySelector('fotcaVisitante');
                    const nomEquipoLocalElement = partido.querySelector('nomEquipoLocal');
                    const nombreEquipoVisitanteElement = partido.querySelector('nombreEquipoVisitante');
                    const etiquetaPartidoElement = partido.querySelector('etiquetaPartido');
                    const resultadoLocalElement = partido.querySelector('resultadoLocal');
                    const resultadoVisitanteElement = partido.querySelector('resultadoVisitante');

                    const fotcaLocal = document.getElementById(`fotcaLocal${i}`);
                    const fotcaVisitante = document.getElementById(`fotcaVisitante${i}`);
                    const nomEquipoLocal = document.getElementById(`nomEquipoLocal${i}`);
                    const nombreEquipoVisitante = document.getElementById(`nombreEquipoVisitante${i}`);
                    const etiquetaPartido = document.getElementById(`etiquetaPartido${i}`);
                    const resultadoLocal = document.getElementById(`resultadoLocal${i}`);
                    const resultadoVisitante = document.getElementById(`resultadoVisitante${i}`);

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
                console.log(`Неверный номер тура: ${i}`);
            }
        }
    } else {
        console.log("Неверный номер сезона");
    }
}
