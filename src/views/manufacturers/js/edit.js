$(() => {
    $('#parentManufacturer').select2({
        placeholder: "Select a parent manufacturer",
        allowClear: true,
    });
    $('#country').select2({
        placeholder: 'Select country',
        allowClear: true,
    });
    $('#city').select2({
        placeholder: 'Select city',
        allowClear: true,
    });

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

    const populateSelect = async (selectElementId, country = '') => {
        const selectElement = $(`#${selectElementId}`);
        let items;
        if (selectElementId === 'country') {
            items = await fetchCountryData();
        }
        if (selectElementId === 'city') {
            items = await fetchCitiesDataForCountry(country);
            selectElement.empty();
        }
        items.forEach((item) => {
            const option = $('<option></option>').val(item).text(item);
            $(selectElement).append(option);
        });
        if (selectElementId === 'country') {
            selectElement.val(selectElement.attr('data-current-country')).trigger('change');
        }
        if (selectElementId === 'city') {
            selectElement.removeAttr('disabled');
            selectElement.val(selectElement.attr('data-current-city'));
        }
    };

    populateSelect('country');

    const fetchCitiesDataForCountry = async (country) => {
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

    $(() => {
        $('#country').on('change', function (e) {
            const selectedCountry = $(this).val();
            if (selectedCountry !== '') {
                $('#city').attr('disabled', 'disabled');
                populateSelect('city', selectedCountry);
            }
        });
    });
})
