let sortColumn = 'name';
let sortOrder = 'asc';
let page = 1;
let pagesLimit = document.getElementById('select-limit-on-page').value;
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

    const btnDeleteCategory = event.target.closest('a.btn-delete-category');
    if (btnDeleteCategory) {
        const shouldDelete = confirm('Czy na pewno chcesz usunąć ten produkt?');
        if (shouldDelete) {
            const endpoint = `/products/${btnDeleteCategory.dataset.doc}`;
            fetch(endpoint, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    actionResult = data.actionResult;
                    fetchDataFromDB();
                })
                .catch(err => console.log(err));
        } else {
            event.preventDefault();
        }
    }
});

container.addEventListener('keyup', event => {
    const targetElement = event.target;
    if (targetElement.id === 'filter-phrase') {
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            page = 1;
            fetchDataFromDB();
        } else if (event.key === 'Backspace') {
            phraseToSearch = phraseToSearch.slice(0, -1);
        } else {
            phraseToSearch += event.key;
        }
    }
});