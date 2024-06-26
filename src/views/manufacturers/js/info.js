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
                            const element = document.querySelector('#info-manufacturer-content');
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