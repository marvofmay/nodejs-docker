document.addEventListener('DOMContentLoaded', () => {
    const btnDeleteCategories = document.querySelectorAll('a.btn-delete-category');
    btnDeleteCategories.forEach(btnDeleteCategory => {
        btnDeleteCategory.addEventListener('click', (e) => {
            const shouldDelete = confirm('Czy na pewno chcesz usunąć tę kategorię?');
            if (shouldDelete) {
                const endpoint = `/categories/${btnDeleteCategory.dataset.doc}`;
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