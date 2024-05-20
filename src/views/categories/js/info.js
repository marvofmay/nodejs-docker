document.addEventListener('DOMContentLoaded', () => {
    const btnDeleteCategories = document.querySelectorAll('a.btn-delete-category');
    btnDeleteCategories.forEach(btnDeleteCategory => {
        const categoryId = btnDeleteCategory.dataset.categoryId;
        const categoryName = btnDeleteCategory.dataset.categoryName;

        btnDeleteCategory.addEventListener('click', (e) => {
            Swal.fire({
                title: `Do you want to delete this category? \n "${categoryName}"`,
                showCancelButton: true,
                confirmButtonText: "Delete",
            }).then((result) => {
                if (result.isConfirmed) {
                    const endpoint = `/categories/${categoryId}`;
                    fetch(endpoint, {
                        method: 'DELETE',
                    })
                        .then(response => response.json())
                        .then(data => {
                            const element = document.querySelector('#info-category-content');
                            if (element) {
                                element.remove();
                                Toastify({
                                    text: data.actionResult.message,
                                    duration: 3000,
                                    newWindow: true,
                                    gravity: 'top',
                                    position: 'right',
                                    style: {
                                        background: "linear-gradient(to right top, #8ec021, #82be29, #77bd31, #6abb37, #5eb93e)",
                                    }
                                }).showToast();
                            }
                        })
                        .catch(err => console.log(err));
                } else if (result.isDenied) {
                    e.preventDefault();
                }
            });
        });
    });
});