$(() => {
    $('#parentManufacturer').select2({});
    $('#country').select2({});
    $('#city').select2({});
})

const fetchCountryData = async () => {
    const endpoint = 'https://countriesnow.space/api/v0.1/countries/iso';

    try {
        const response = await fetch(endpoint);
        if (! response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const data = result.data;

        return data.map(country => country.name);
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
};

const populateSelect = async () => {
    const countries = await fetchCountryData();
    const selectElement = document.getElementById('country');
    selectElement.innerHTML = '';
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Choose ...';
    selectElement.appendChild(option);
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        selectElement.appendChild(option);
    });
};

populateSelect();

const fetchCitiesForCountry = async (country) => {
    const endpoint = 'https://countriesnow.space/api/v0.1/countries/cities';
    const data = {
        country: country
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        return [];
    }
};

const displayCities = async (country) => {
    const cities = await fetchCitiesForCountry(country);
    console.log(cities);
};

displayCities('poland');