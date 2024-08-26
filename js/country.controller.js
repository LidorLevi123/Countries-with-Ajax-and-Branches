'use strict'

function onSearch(ev) {
    ev.preventDefault()
    const { value } = ev.target[0]

    getCountryByName(value)
        .then(renderCountry)
}

function renderCountry(country) {
    console.log('country:', country)
    const strHTML = `
        <h2 class="name">${country.name.common}</h2>
        <img class="flag-img" src="${country.flags.png}" alt="">
        <p class="flag-description">${country.flags.alt}</p>
        <p class="population">Population: ${country.population}</p>
        <p class="area">Area: ${country.area}</p>`

    const elCountry = document.querySelector('.country-preview')
    elCountry.innerHTML = strHTML
    setTimeout(window.scrollTo({ top: document.body.scrollHeight }), 500)
}

function onRemoveCache() {
    if(!confirm('Are you sure?')) return
    removeCache()
}