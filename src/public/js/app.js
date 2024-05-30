document.addEventListener('DOMContentLoaded', () => {
    const btnBack = document.querySelectorAll('button.btn-back');
    btnBack.forEach(btnDeleteCategory => {
        btnDeleteCategory.addEventListener('click', (e) => {
            window.history.back();
        });
    });

    document.getElementById('btn-clear-form')?.addEventListener('click', () => {
        const form = document.querySelector('.editForm');
        form.querySelectorAll('input[type="text"], input[type="email"], textarea, select').forEach(input => {
            input.value = '';
        });
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        $('#categories').val(null).trigger('change');
        $('#manufacturer').val(null).trigger('change');
        $('#country').val(null).trigger('change');
        $('#city').val(null).trigger('change');
    });
});