'use strict'

function loadFromLocalStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}