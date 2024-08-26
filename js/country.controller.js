'use strict'

function onSearch(ev) {
    ev.preventDefault()
    const { value } = ev.target[0]
    showLoader()

    getCountryByName(value)
        .then(renderCountry)
        .then(hideLoader)
}

function renderCountry(country) {
    const { common: countryName } = country.name
    const [lat, lng] = country.latlng

    const strHTML = `
        <h2 class="name">${countryName}</h2>
        <img class="flag-img" src="${country.flags.png}" alt="">
        <p class="flag-description">${country.flags.alt}</p>
        <p class="population">Population: ${country.population}</p>
        <p class="area">Area: ${country.area}</p>
        <a href="https://www.google.com/maps/place/${countryName}/@${lat},${lng},7z/">
            Click to view ${countryName} on Google Maps!
        </a>`

    console.log('country:', country)
    const elCountry = document.querySelector('.country-preview')
    elCountry.innerHTML = strHTML
    setTimeout(window.scrollTo({ top: document.body.scrollHeight }), 500)
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