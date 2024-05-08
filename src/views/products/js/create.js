$(() => {
    $('#categories').select2({
        placeholder: 'Choose categories ...',
    });
    $('#manufacturer').select2({
        placeholder: 'Choose manufacturer ...',
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