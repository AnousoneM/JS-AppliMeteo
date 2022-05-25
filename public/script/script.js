// Fonction permettant d'afficher la météo sur la plage
function displayMeteo(id) {
    // Nous déclarons les variables en amont
    let cityId = id
    let apiKey = 'f7b8add7a149e97cc34ff0ede12823a5' // votre clef d'API
    let lang = 'fr'
    let metric = 'metric'

    // nous récupérons les données de l'API
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&lang=${lang}&units=${metric}`)
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)
    })
}

displayMeteo(3029240)
