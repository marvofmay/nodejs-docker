document.addEventListener('DOMContentLoaded', () => {
    const btnDeleteProduct = document.querySelectorAll('a.btn-delete-product');
    btnDeleteProduct.forEach(btnDeleteProduct => {
        btnDeleteProduct.addEventListener('click', (e) => {
            const shouldDelete = confirm('Czy na pewno chcesz usunąć tę kategorię?');
            if (shouldDelete) {
                const endpoint = `/products/${btnDeleteProduct.dataset.doc}`;
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