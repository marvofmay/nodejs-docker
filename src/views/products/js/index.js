let sortColumn = 'name';
let sortOrder = 'asc';
let page = 1;
let pagesLimit = document.getElementById('select-limit-on-page')?.value ?? 5;
let phraseToSearch = '';
let endpoint = '/products/ajaxlist';
let actionResult = {};

const fetchDataFromDB = () => {
    const payload = {
        sortColumn: sortColumn,
        sortOrder: sortOrder,
        pagesLimit: parseInt(pagesLimit),
        page: parseInt(page),
        phraseToSearch: phraseToSearch,
        actionResult: actionResult,
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.text())
        .then(htmlData => {
            const container = document.getElementById('content-product-list');
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(htmlData, 'text/html');
            const contentProductList = htmlDoc.getElementById('content-product-list');
            if (contentProductList) {
                container.innerHTML = contentProductList.innerHTML;
            } else {
                console.error('Nie znaleziono elementu o id "content-product-list".');
            }
        })
        .catch(error => {
            console.error('Błąd podczas pobierania HTML:', error);
        });
}

const container = document.getElementById('content-product-list');
container.addEventListener('click', function(event) {
    const targetElement = event.target;

    const pageItem = event.target.closest('.page-item');
    if (pageItem) {
        page = pageItem.querySelector('.page-link').dataset.page;
        fetchDataFromDB();
    }
    if (targetElement.id === 'select-limit-on-page') {
        page = 1;
        pagesLimit = targetElement.value;
        fetchDataFromDB();
    }
    if (targetElement.classList.contains('column-sort')) {
        page = 1;
        sortColumn = targetElement.dataset.column;
        sortOrder = targetElement.dataset.order;
        fetchDataFromDB();
    }

    const btnDeleteProduct = event.target.closest('a.btn-delete-product');
    const productName = btnDeleteProduct?.getAttribute('data-product-name');
    const productId = btnDeleteProduct?.getAttribute('data-product-id');
    if (btnDeleteProduct) {
        Swal.fire({
            title: `Do you want to delete this product \n "${productName}"?`,
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
                        actionResult = data.actionResult;
                        fetchDataFromDB();
                    })
                    .catch(err => console.log(err));;
            } else if (result.isDenied) {
                e.preventDefault();
            }
        });
    }
});

container.addEventListener('keyup', event => {
    const targetElement = event.target;
    if (targetElement.id === 'filter-phrase' && (event.key === 'Enter' || event.key === 'NumpadEnter')) {
        page = 1;
        phraseToSearch = targetElement.value;
        fetchDataFromDB();
    }
});