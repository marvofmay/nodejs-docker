let sortColumn = 'createdAt';
let sortOrder = 'desc';
let page = 1;
let pagesLimit = document.getElementById('select-limit-on-page').value;
let phraseToSearch = '';
let endpoint = '/manufacturers/ajaxlist';
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
            const container = document.getElementById('content-manufacturer-list');
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(htmlData, 'text/html');
            const contentManufacturerList = htmlDoc.getElementById('content-manufacturer-list');
            if (contentManufacturerList) {
                container.innerHTML = contentManufacturerList.innerHTML;
            } else {
                console.error('Nie znaleziono elementu o id "content-manufacturer-list".');
            }
        })
        .catch(error => {
            console.error('Błąd podczas pobierania HTML:', error);
        });
}

const container = document.getElementById('content-manufacturer-list');
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

    const btnDeleteManufacturer = event.target.closest('a.btn-delete-manufacturer');
    const manufacturerName = btnDeleteManufacturer?.getAttribute('data-manufacturer-name');
    const manufacturerId = btnDeleteManufacturer?.getAttribute('data-manufacturer-id');
    if (btnDeleteManufacturer) {
        const activePageItem = document.querySelector('.page-item.active');
        if (activePageItem) {
            const pageLink = activePageItem.querySelector('.page-link');
            if (pageLink) {
                page = pageLink.getAttribute('data-page');
            }
        }

        Swal.fire({
            title: `Do you want to delete this manufacturer \n "${manufacturerName}"?`,
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
                        actionResult = data.actionResult;
                        fetchDataFromDB();
                    })
                    .catch(err => console.log(err));;
            } else if (result.isDenied) {
                e.preventDefault();
            }
        });
    }

    const btnRestoreManufacturer = event.target.closest('a.btn-restore-manufacturer');
    const manufacturerNameToRestore = btnRestoreManufacturer?.getAttribute('data-manufacturer-name');
    const manufacturerIdToRestore = btnRestoreManufacturer?.getAttribute('data-manufacturer-id');
    if (btnRestoreManufacturer) {
        const activePageItem = document.querySelector('.page-item.active');
        if (activePageItem) {
            const pageLink = activePageItem.querySelector('.page-link');
            if (pageLink) {
                page = pageLink.getAttribute('data-page');
            }
        }

        Swal.fire({
            title: `Do you want to restore this manufacturer \n "${manufacturerNameToRestore}"?`,
            showCancelButton: true,
            confirmButtonText: "Restore",
        }).then((result) => {
            if (result.isConfirmed) {
                const endpoint = `/manufacturers/${manufacturerIdToRestore}/restore`;
                fetch(endpoint, {
                    method: 'PATCH',
                })
                    .then(response => response.json())
                    .then(data => {
                        actionResult = data.actionResult;
                        fetchDataFromDB();
                    })
                    .catch(err => console.log(err));
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