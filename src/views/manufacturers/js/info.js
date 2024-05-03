document.addEventListener('DOMContentLoaded', () => {
    const btnDeleteManufacturers = document.querySelectorAll('a.btn-delete-manufacturer');
    btnDeleteManufacturers.forEach(btnDeleteManufacturer => {
        btnDeleteManufacturer.addEventListener('click', (e) => {

            Swal.fire({
                title: "Do you want to delete this manufacturer?",
                showCancelButton: true,
                confirmButtonText: "Delete",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const endpoint = `/manufacturers/${btnDeleteManufacturer.dataset.doc}`;
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
                                    duration: 2500,
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