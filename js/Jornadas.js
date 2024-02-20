document.addEventListener("DOMContentLoaded", function() {
    loadTemporadas();
    document.getElementById("Temporada").addEventListener("change", function() {
        var selectedTemporadaId = this.value;
        loadJornadas(selectedTemporadaId);
    });

    document.getElementById("Jornada").addEventListener("change", function() {
        var selectedTemporadaId = document.getElementById("Temporada").value;
        var selectedJornadaId = this.value;
        loadXMLDoc("/XMLyXSD/XMLJornadas.xml", function(xmlDoc) {
            updateJornadaInfo(xmlDoc, selectedJornadaId, selectedTemporadaId);
        });
    });
});

function loadTemporadas() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayTemporadas(this);
        }
    };
    xmlhttp.open("GET", "/XMLyXSD/XMLJornadas.xml", true);
    xmlhttp.send();
}

function displayTemporadas(xml) {
    var xmlDoc = xml.responseXML;
    var temporadas = xmlDoc.getElementsByTagName("Temporada");
    var selectTemporada = document.getElementById("Temporada");
    
    // Clear existing options
    selectTemporada.innerHTML = "";
    
    var existingOptions = {}; // Object to store existing options
    
    for (var i = 0; i < temporadas.length; i++) {
        var id = temporadas[i].getAttribute("id");
        
        // Check if the option already exists
        if (!existingOptions[id]) {
            var option = document.createElement("option");
            option.value = id;
            option.text = id;
            selectTemporada.appendChild(option);
            existingOptions[id] = true; // Mark this option as existing
        }
    }
    
    // Set default selected temporada
    selectTemporada.value = '2024';

    // Trigger change event to populate jornadas initially
    selectTemporada.dispatchEvent(new Event("change"));
}

function loadJornadas(selectedTemporadaId) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayJornadas(selectedTemporadaId, this.responseXML);
        }
    };
    xmlhttp.open("GET", "/XMLyXSD/XMLJornadas.xml", true);
    xmlhttp.send();
}

function displayJornadas(selectedTemporadaId, xmlDoc) {
    var jornadas = xmlDoc.querySelectorAll('Temporada[id="' + selectedTemporadaId + '"] Jornada');
    var selectJornada = document.getElementById("Jornada");
    selectJornada.innerHTML = ""; // Clear previous options
    
    if (jornadas.length > 0) {
        jornadas.forEach(function(jornada) {
            var id = jornada.getAttribute("id");
            var option = document.createElement("option");
            option.value = id;
            option.text = id;
            selectJornada.appendChild(option);
        });
    } else {
        var option = document.createElement("option");
        option.text = "No Jornadas available";
        selectJornada.appendChild(option);
    }

    // Set default selected jornada
    selectJornada.value = '1';
}

function loadXMLDoc(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseXML);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

window.onload = function() {
    const defaultSelectedTemporada = '2024'; // Задаем 2024 год по умолчанию
    const defaultSelectedJornada = '1'; // Задаем 1 тур по умолчанию
    loadXMLDoc("/XMLyXSD/XMLJornadas.xml", function(xmlDoc) {
        updateJornadaInfo(xmlDoc, defaultSelectedJornada, defaultSelectedTemporada);
    });
};


function updateJornadaInfo(xmlDoc, jornada, temporada) {
    console.log(`Год: ${temporada}`);
    console.log(`Тур: ${jornada}`);

    // Получить элемент года из XML-файла по указанному году
    const TemporadaElement = xmlDoc.querySelector(`Temporada[id="${temporada}"]`);
    console.log(TemporadaElement);
    if (TemporadaElement) {
        // Получить элемент тура внутри года по указанному туру
        const JornadaElement = TemporadaElement.querySelector(`Jornada[id="${jornada}"]`);
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
