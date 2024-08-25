'use strict'

function onSearch(ev) {
    ev.preventDefault()
    const { value } = ev.target[0]
    
    getCountryByName(value)
        .then(renderCountry)
}

function renderCountry(country) {
    console.log('country:', country)
    document.querySelector('.country-preview').innerHTML = JSON.stringify(country, null, 4)
}