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
                            const element = document.querySelector('#category-content');
                            if (element) {
                                element.style.display = 'none';
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
                            const btnPDF = document.querySelector('#btn-pdf-category');
                            if (btnPDF) {
                                btnPDF.style.display = 'none';
                            }
                            const btnEdit = document.querySelector('#btn-edit-category');
                            if (btnEdit) {
                                btnEdit.style.display = 'none';
                            }
                            const btnDelete = document.querySelector('#btn-delete-category');
                            if (btnDelete) {
                                btnDelete.style.display = 'none';
                            }
                            const btnRestore = document.querySelector('#btn-restore-category');
                            if (btnRestore) {
                                btnRestore.style.display = 'inline';
                            }
                        })
                        .catch(err => console.log(err));
                } else if (result.isDenied) {
                    e.preventDefault();
                }
            });
        });
    });

    const btnRestoreCategories = document.querySelectorAll('a.btn-restore-category');
    btnRestoreCategories.forEach(btnRestoreCategory => {
        const categoryIdRestore = btnRestoreCategory.dataset.categoryId;
        const categoryNameRestore = btnRestoreCategory.dataset.categoryName;

        btnRestoreCategory.addEventListener('click', (e) => {
            Swal.fire({
                title: `Do you want to restore this category? \n "${categoryNameRestore}"`,
                showCancelButton: true,
                confirmButtonText: "Restore",
            }).then((result) => {
                if (result.isConfirmed) {
                    const endpoint = `/categories/${categoryIdRestore}/restore`;
                    fetch(endpoint, {
                        method: 'PATCH',
                    })
                        .then(response => response.json())
                        .then(data => {
                            const element = document.querySelector('#category-content');
                            if (element) {
                                element.style.display = 'block';
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
                            const btnPDF = document.querySelector('#btn-pdf-category');
                            if (btnPDF) {
                                btnPDF.style.display = 'inline';
                            }
                            const btnEdit = document.querySelector('#btn-edit-category');
                            if (btnEdit) {
                                btnEdit.style.display = 'inline';
                            }
                            const btnDelete = document.querySelector('#btn-delete-category');
                            if (btnDelete) {
                                btnDelete.style.display = 'inline';
                            }
                            const btnRestore = document.querySelector('#btn-restore-category');
                            if (btnRestore) {
                                btnRestore.style.display = 'none';
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