'use strict'

function onSearch(ev) {
    ev.preventDefault()
    showLoader()
    const { value } = ev.target[0]

    getCountryBy('name', value)
        .then(renderCountry)
        .then(hideLoader)
}

function renderCountry(country) {
    console.log('country:', country)
    const borderList = country.borders?.map(border => `<li onclick="onGetCountryByCode('${border}')">${border}</li>`).join('') || 'None'
    const strHTML = `
        <h2 class="name">${country.name.common}</h2>
        <img class="flag-img" src="${country.flags.png}" alt="">

        <p class="flag-description">${country.flags.alt}</p>
        <p class="population">Population: ${country.population}</p>
        <p class="area">Area: ${country.area}</p>

        <h2>Neighboring countries</h2>
            <ul class="neighbor-list">
                ${borderList}
            </ul>
        `

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