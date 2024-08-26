'use strict'

var gCache = loadFromLocalStorage('cache') || {}

function getCountryBy(type, term) {
    if (gCache[term]) return Promise.resolve(gCache[term])

    const endpoints = _getEndpoints(term)

    return fetch(endpoints[type])
        .then(res => res.json())
        .then(countries => countries[0])
        .then(country => _saveToCache(term, country))
        .catch(err => console.log('Could not get country', err))
}

function removeCache() {
    gCache = {}
    localStorage.removeItem('cache')
}

function _saveToCache(term, country) {
    gCache[term] = country
    saveToLocalStorage('cache', gCache)
    return country
}

function _getEndpoints(term) {
    return {
        name: `https://restcountries.com/v3.1/name/${term}`,
        code: `https://restcountries.com/v3.1/alpha/${term}`
    }
}