'use strict'

function getCountry(term) {
    return fetch(`https://restcountries.com/v3.1/name/${term}`)
        .then(res => res.json())
        .then(countries => countries[0])
}