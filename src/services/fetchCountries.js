const fetchCountries = countryName => {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(res => res.json()).then(data => {
        if (data.status === 404) {
            return Promise.reject('Not found');
        }
        return data;
    });
}
export default fetchCountries;