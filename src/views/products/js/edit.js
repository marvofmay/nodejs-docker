$(() => {
    $('#categories').select2({
        placeholder: 'choose...',
    });
    $('#manufacturer').select2({
        placeholder: 'choose...',
    });
})

document.getElementById('price').addEventListener('input', function() {
    let value = this.value;

    value = value.replace(',', '.');
    if (!/^\d*\.?\d{0,2}$/.test(value)) {
        value = value.slice(0, -1);
    }

    this.value = value;
});

const deleteButtons = document.querySelectorAll('.btn-delete-photo');
deleteButtons.forEach(buttonDeletePhoto => {
    buttonDeletePhoto.addEventListener('click', () => {
        if (buttonDeletePhoto) {
            const photoId = buttonDeletePhoto.dataset.photoId;
            const shouldDelete = confirm('Czy na pewno chcesz usunąć zdjęcie?');
            if (shouldDelete) {
                const endpoint = `/photos/${photoId}`;
                fetch(endpoint, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {

                        //remove div with photo

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
                    })
                    .catch(err => console.log(err));
            } else {
                event.preventDefault();
            }
        }
    });
});