document.addEventListener('DOMContentLoaded', function () {
    // Загружаем XML и обновляем таблицу
    fetch('/XMLyXSD/XMLPersonas.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Обновляем таблицу с данными о клубах
            updatePlayerInfo(xmlDoc);
        });
});

  function updatePlayerInfo(xmlDoc) {

    for (let i = 1; i <= 13; i++) {

    const PersonaElement = xmlDoc.querySelector(`jugador${i}`);

    const FotcaElement = PersonaElement.querySelector('Fotca');
    const NameElement = PersonaElement.querySelector('Name');
    const AnosElement = PersonaElement.querySelector('Anos');
    const AltElement = PersonaElement.querySelector('Alt');
    const PesoElement = PersonaElement.querySelector('Peso');

    const Fotca = document.getElementById(`Fotca${i}`);
    const Name = document.getElementById(`Name${i}`);
    const Anos = document.getElementById(`Anos${i}`);
    const Alt = document.getElementById(`Alt${i}`);
    const Peso = document.getElementById(`Peso${i}`);
  
    Fotca.src = FotcaElement.textContent;
    Name.textContent = NameElement.textContent;
    Anos.textContent = AnosElement.textContent;
    Alt.textContent = AltElement.textContent;
    Peso.textContent = PesoElement.textContent;
    }
  }