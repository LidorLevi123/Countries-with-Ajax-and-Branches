'use strict'

var gCache = loadFromLocalStorage('cache') || {}

function getCountryByName(term) {
    if(gCache[term]) return Promise.resolve(gCache[term])

    return fetch(`https://restcountries.com/v3.1/name/${term}`)
        .then(res => res.json())
        .then(countries => countries[0])
        .then(country => _saveToCache(term, country))
        .catch(err => console.log('Could not get country', err))
}

function _saveToCache(term, country) {
    gCache[term] = country
    saveToLocalStorage('cache', gCache)
    return country
}

function removeCache() {
    gCache = {}
    localStorage.removeItem('cache')
}

function loadFromLocalStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}