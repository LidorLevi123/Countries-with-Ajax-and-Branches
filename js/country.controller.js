'use strict'

function onInit() {
    getCountryBy('name', 'isr')
        .then(renderCountry)
        .then(hideLoader)
}

function onSearch(ev) {
    ev.preventDefault()
    showLoader()
    const { value } = ev.target[0]

    getCountryBy('name', value)
        .then(renderCountry)
        .then(hideLoader)
}

function renderCountry(country) {
    const { common: countryName } = country.name
    const [lat, lng] = country.latlng

    const borderList = country.borders?.map(border => `
        <li onclick="onGetCountryByCode('${border}')">
            🌍 ${border}
            <img src="https://flagsapi.com/${border}/flat/64.png">
        </li>`).join('') || 'None'
    const strHTML = `
        <section>
            <h2 class="name">${countryName}</h2>
            <p class="population">Population: ${country.population}</p>
            <p class="area">Area: ${country.area}</p>
        
            <h2>Neighboring countries</h2>
            <ul class="neighbor-list">
                ${borderList}
            </ul>
        </section>

        <section>
            <img class="flag-img" src="${country.flags.png}" alt="">

            <p class="flag-description">${country.flags.alt}</p>
            <a href="https://www.google.com/maps/place/${countryName}/@${lat},${lng},7z/">
                Click to view ${countryName} on Google Maps!
            </a>
        </section>`

    const elCountry = document.querySelector('.country-preview')
    elCountry.innerHTML = strHTML
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight }), 200)
}

function onGetCountryByCode(code) {
    showLoader()

    getCountryBy('code', code)
        .then(renderCountry)
        .then(hideLoader)
}

function onRemoveCache() {
    if (!confirm('Are you sure?')) return
    removeCache()
}

function showLoader() {
    document.querySelector('.loader').hidden = false
}

function hideLoader() {
    document.querySelector('.loader').hidden = true
}