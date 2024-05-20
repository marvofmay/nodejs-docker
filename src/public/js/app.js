document.addEventListener('DOMContentLoaded', () => {
    const btnBack = document.querySelectorAll('button.btn-back');
    btnBack.forEach(btnDeleteCategory => {
        btnDeleteCategory.addEventListener('click', (e) => {
            window.history.back();
        });
    });
});