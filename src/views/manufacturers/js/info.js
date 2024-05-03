document.addEventListener('DOMContentLoaded', () => {
    const btnDeleteManufacturers = document.querySelectorAll('a.btn-delete-manufacturer');
    btnDeleteManufacturers.forEach(btnDeleteManufacturer => {
        btnDeleteManufacturer.addEventListener('click', (e) => {
            const shouldDelete = confirm('Czy na pewno chcesz usunąć tego producenta?');
            if (shouldDelete) {
                const endpoint = `/manufacturers/${btnDeleteManufacturer.dataset.doc}`;
                fetch(endpoint, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => window.location.href = data.redirect)
                    .catch(err => console.log(err));
            } else {
                e.preventDefault();
            }
        });
    });
});