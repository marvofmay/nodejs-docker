document.addEventListener('DOMContentLoaded', () => {
    const btnDeleteManufacturers = document.querySelectorAll('a.btn-delete-manufacturer');
    btnDeleteManufacturers.forEach(btnDeleteManufacturer => {
        const manufacturerId = btnDeleteManufacturer.dataset.manufacturerId;
        const manufacturerName = btnDeleteManufacturer.dataset.manufacturerName;

        btnDeleteManufacturer.addEventListener('click', e => {
            Swal.fire({
                title: `Do you want to delete this manufacturer? \n "${manufacturerName}"`,
                showCancelButton: true,
                confirmButtonText: "Delete",
            }).then((result) => {
                if (result.isConfirmed) {
                    const endpoint = `/manufacturers/${manufacturerId}`;
                    fetch(endpoint, {
                        method: 'DELETE',
                    })
                        .then(response => response.json())
                        .then(data => {
                            const element = document.querySelector('#manufacturer-content');
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
                            const btnPDF = document.querySelector('#btn-pdf-manufacturer');
                            if (btnPDF) {
                                btnPDF.style.display = 'none';
                            }
                            const btnEdit = document.querySelector('#btn-edit-manufacturer');
                            if (btnEdit) {
                                btnEdit.style.display = 'none';
                            }
                            const btnDelete = document.querySelector('#btn-delete-manufacturer');
                            if (btnDelete) {
                                btnDelete.style.display = 'none';
                            }
                            const btnRestore = document.querySelector('#btn-restore-manufacturer');
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

    const btnRestoreManufacturers = document.querySelectorAll('a.btn-restore-manufacturer');
    btnRestoreManufacturers.forEach(btnRestoreManufacturer => {
        const manufacturerIdRestore = btnRestoreManufacturer.dataset.manufacturerId;
        const manufacturerNameRestore = btnRestoreManufacturer.dataset.manufacturerName;

        btnRestoreManufacturer.addEventListener('click', (e) => {
            Swal.fire({
                title: `Do you want to restore this manufacturer? \n "${manufacturerNameRestore}"`,
                showCancelButton: true,
                confirmButtonText: "Restore",
            }).then((result) => {
                if (result.isConfirmed) {
                    const endpoint = `/manufacturers/${manufacturerIdRestore}/restore`;
                    fetch(endpoint, {
                        method: 'PATCH',
                    })
                        .then(response => response.json())
                        .then(data => {
                            const element = document.querySelector('#manufacturer-content');
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
                            const btnPDF = document.querySelector('#btn-pdf-manufacturer');
                            if (btnPDF) {
                                btnPDF.style.display = 'inline';
                            }
                            const btnEdit = document.querySelector('#btn-edit-manufacturer');
                            if (btnEdit) {
                                btnEdit.style.display = 'inline';
                            }
                            const btnDelete = document.querySelector('#btn-delete-manufacturer');
                            if (btnDelete) {
                                btnDelete.style.display = 'inline';
                            }
                            const btnRestore = document.querySelector('#btn-restore-manufacturer');
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