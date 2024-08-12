document.addEventListener('DOMContentLoaded', () => {
    const btnDeleteProducts = document.querySelectorAll('a.btn-delete-product');
    btnDeleteProducts.forEach(btnDeleteProduct => {
        const productId = btnDeleteProduct.dataset.productId;
        const productName = btnDeleteProduct.dataset.productName;

        btnDeleteProduct.addEventListener('click', (e) => {
            Swal.fire({
                title: `Do you want to delete this product? \n "${productName}"`,
                showCancelButton: true,
                confirmButtonText: "Delete",
            }).then((result) => {
                if (result.isConfirmed) {
                    const endpoint = `/products/${productId}`;
                    fetch(endpoint, {
                        method: 'DELETE',
                    })
                        .then(response => response.json())
                        .then(data => {
                            const element = document.querySelector('#info-product-content');
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