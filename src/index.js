import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
var _ = require('lodash');

import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';

import getRefs from './services/refs';
import fetchCountries from './services/fetchCountries';
import makeCoutryListMarkup from './templates/coutry-list.hbs'
import makeCoutryInfoMarkup from './templates/country-info.hbs'

const refs = getRefs();

const clearRender = () => {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

const countryRender = countries => {
    if (countries.length === 0) {
        clearRender();
        error({
            text: "Please",
            delay: 1000,
    })
    }
    if (countries.length === 1) {
        clearRender();
        const markup = makeCoutryInfoMarkup(countries);
        refs.countryInfo.innerHTML = markup;
    } else if (countries.length <= 10) {
        clearRender();
        const markup = makeCoutryListMarkup(countries);
        refs.countryList.innerHTML = markup;
    } else {
        clearRender();
        error({
            text: "To many matches found. Please enter a more symbols",
            delay: 1000,
    });}  
}

const onInputContry = e => {
    const countryName = e.target.value;
    fetchCountries(countryName).then(countryRender).catch(err => {
        clearRender();
        error({
            text: 'Please enter a valid country name!',
            delay: 1000,
        })
    }
    );
}

refs.input.addEventListener('input', _.debounce(onInputContry, 500) )

