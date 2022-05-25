// Fonction permettant d'afficher la date au format jour mois ex. 23 mai
function frenchDate(longDate) { // ex. 2022-05-23 12:00:00
    let arrayMonths = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    let arrayDate = longDate.split(' ')[0].split('-') // ['2022','05','23']
    return arrayDate[2] + ' ' + arrayMonths[+arrayDate[1] - 1] + ' ' + arrayDate[0] // 23 Mai 2022
}

// Fonction permattant d'afficher l'heure au format suivant ex. 12h
function frenchHour(longDate) { // ex. 2022-05-23 12:00:00
    let arrayHour = longDate.split(' ')[1].split(':') // ['12','00','00']
    return arrayHour[0] + 'h00' // 12h00
}

// fonction permettant d'afficher les prévisions selon les données du json
function createForecast(data, totalPreview) {
    // Nous affichons les premières données dans la div mainForecast, nous choisissons donc l'index [0]
    let mainForecast = document.getElementById('mainForecast')
    mainForecast.insertAdjacentHTML('beforeend', `
        <h1 class="city">${data.city.name}</h1>
        <p class="main-date">${frenchDate(data.list[0].dt_txt)}</p>
        <div class="forecast col-lg-4 py-3 shadow rounded-3">
            <p class="main-hour mb-0">${frenchHour(data.list[0].dt_txt)}</p>
            <img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="Nuageux">
            <p class="main-temp mb-0">${data.list[0].main.temp}°</p>
        </div>
    `)

    // boucle for pour afficher les prévisions dans la div multiForecast sur une plage de 15h = 5x3h, nous demarrons depuis l'index [1]
    let multiForecast = document.getElementById('multiForecast')
    for (let i = 1; i <= totalPreview; i++) {
        multiForecast.insertAdjacentHTML('beforeend', `
        <div class="forecast col-lg-2 p-2 text-center rounded-3 shadow">
            <p class="fs-6 mb-0 mt-1">${frenchDate(data.list[i].dt_txt)}</p>
            <p class="fs-5 mb-0">${frenchHour(data.list[i].dt_txt)}</p>
            <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Nuageux">
            <p class="fs-5 mb-0">${data.list[i].weather[0].description}</p>
            <p class="fs-3 fw-bold">${data.list[i].main.temp}°</p>
        </div>
    `)
    }
}

// Fonction permettant d'afficher la météo selon l'id de la ville
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
            // nous utilisons la fonction createForecast pour afficher les prévisions
            createForecast(data, 5)
        })
}

// Nous choisissons une ville arbitrairement, et nous lançons la fonction au démarrage de notre page
// 3029240 = Caen
// 6456451 = Le Havre
// 2989877 = Cuts
// 6454431 = Compiègne
// 6453974 = Toulouse
displayMeteo(3029240)