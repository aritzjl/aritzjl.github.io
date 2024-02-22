// Cuando el DOM está completamente cargado, ejecutar estas acciones
document.addEventListener("DOMContentLoaded", function() {
    // Cargar las temporadas disponibles al inicio
    loadTemporadas();

    // Añadir un evento al cambio de la selección de temporada
    document.getElementById("temporada").addEventListener("change", function() {
        var selectedTemporadaId = this.value;
        loadJornadas(selectedTemporadaId);
    });

    // Añadir un evento al cambio de la selección de jornada
    document.getElementById("jornada").addEventListener("change", function() {
        var selectedTemporadaId = document.getElementById("temporada").value;
        var selectedJornadaId = this.value;
        loadJornadasXML(selectedTemporadaId, selectedJornadaId);
    });
});

// Función para cargar las temporadas disponibles
function loadTemporadas() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayTemporadas(this);
        }
    };
    xmlhttp.open("GET", "/XMLyXSD/jornadas.xml", true);
    xmlhttp.send();
}

// Función para mostrar las temporadas en el dropdown
function displayTemporadas(xml) {
    var xmlDoc = xml.responseXML;
    var temporadas = xmlDoc.getElementsByTagName("temporada");
    var selectTemporada = document.getElementById("temporada");
    selectTemporada.innerHTML = "";

    for (var i = 0; i < temporadas.length; i++) {
        var id = temporadas[i].getAttribute("id");
        var option = createOption(id, id);
        selectTemporada.appendChild(option);
    }

    // Establecer el valor por defecto como '2024' y lanzar el evento change
    selectTemporada.value = '2024';
    selectTemporada.dispatchEvent(new Event("change"));
}

// Función para cargar las jornadas de una temporada seleccionada
function loadJornadas(selectedTemporadaId) {
    loadXMLDoc("/XMLyXSD/jornadas.xml", function(xmlDoc) {
        displayJornadas(selectedTemporadaId, xmlDoc);
    });
}

// Función para mostrar las jornadas en el dropdown
function displayJornadas(selectedTemporadaId, xmlDoc) {
    var jornadas = xmlDoc.querySelectorAll('temporada[id="' + selectedTemporadaId + '"] jornada');
    var selectJornada = document.getElementById("jornada");
    selectJornada.innerHTML = "";

    var chooseOption = createOption("", "Choose Jornada");
    selectJornada.appendChild(chooseOption);

    if (jornadas.length > 0) {
        jornadas.forEach(function(jornada) {
            var id = jornada.getAttribute("id");
            var option = createOption(id, id);
            selectJornada.appendChild(option);
        });
    } else {
        var option = createOption("", "No Jornadas available");
        selectJornada.appendChild(option);
    }
}

// Función para cargar las jornadas y actualizar la información
function loadJornadasXML(selectedTemporadaId, selectedJornadaId) {
    loadXMLDoc("/XMLyXSD/jornadas.xml", function(xmlDoc) {
        updateJornadaInfo(xmlDoc, selectedJornadaId, selectedTemporadaId);
    });
}

// Función para cargar un archivo XML utilizando XMLHttpRequest
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

// Función para crear un elemento opción para un dropdown
function createOption(value, text) {
    var option = document.createElement("option");
    option.value = value;
    option.text = text;
    return option;
}

// Al cargar la ventana, cargar los datos de la temporada '2024' y jornada '1' por defecto
window.onload = function() {
    const defaultSelectedTemporada = '2024';
    const defaultSelectedJornada = '1';
    loadXMLDoc("/XMLyXSD/jornadas.xml", function(xmlDoc) {
        updateJornadaInfo(xmlDoc, defaultSelectedJornada, defaultSelectedTemporada);
    });
};

// Función para actualizar la información de la jornada seleccionada
function updateJornadaInfo(xmlDoc, jornada, temporada) {

    const TemporadaElement = xmlDoc.querySelector(`temporada[id="${temporada}"]`);
    if (TemporadaElement) {
        const JornadaElement = TemporadaElement.querySelector(`jornada[id="${jornada}"]`);
        if (JornadaElement) {
            const partidos = JornadaElement.querySelectorAll('partido');
            partidos.forEach((partido, i) => {
                const nomequipoLocalElement = partido.querySelector('nomequipoLocal');
                const nomEquipoVisitanteElement = partido.querySelector('nomEquipoVisitante');
                const etiquetaPartidoElement = partido.querySelector('etiquetaPartido');
                const resultadoLocalElement = partido.querySelector('resultadoLocal');
                const resultadoVisitanteElement = partido.querySelector('resultadoVisitante');

                const nomequipoLocal = document.getElementById(`nomequipoLocal${i + 1}`);
                const nomEquipoVisitante = document.getElementById(`nomEquipoVisitante${i + 1}`);
                const etiquetaPartido = document.getElementById(`etiquetaPartido${i + 1}`);
                const resultadoLocal = document.getElementById(`resultadoLocal${i + 1}`);
                const resultadoVisitante = document.getElementById(`resultadoVisitante${i + 1}`);

                if (nomequipoLocal && nomEquipoVisitante && etiquetaPartido && resultadoLocal && resultadoVisitante) {
                    nomequipoLocal.textContent = nomequipoLocalElement.textContent;
                    nomEquipoVisitante.textContent = nomEquipoVisitanteElement.textContent;
                    etiquetaPartido.textContent = etiquetaPartidoElement.textContent;
                    resultadoLocal.textContent = resultadoLocalElement.textContent;
                    resultadoVisitante.textContent = resultadoVisitanteElement.textContent;
                }
            });
        } else {
            console.log("Número de jornada incorrecto");
        }
    } else {
        console.log("Año de temporada incorrecto");
    }
}
