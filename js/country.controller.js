'use strict'

function onSearch(ev) {
    ev.preventDefault()
    const term = ev.target[0].value
    
    getCountry(term)
        .then(renderCountry)
}

function renderCountry(country) {
    console.log('country:', country)
    document.querySelector('.country-preview').innerHTML = JSON.stringify(country, null, 4)
}