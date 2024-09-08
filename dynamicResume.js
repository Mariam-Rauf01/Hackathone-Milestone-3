document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var phoneInput = document.getElementById('phone');
    var phoneError = document.getElementById('phoneError');
    form.addEventListener('submit', function (event) {
        var isValid = true;
        // Clear previous error message
        phoneError.classList.add('hidden');
        // Phone number validation (simple example: must be 10 digits)
        var phoneValue = phoneInput.value;
        var phonePattern = /^\d{10}$/; // Adjust pattern as needed
        if (!phonePattern.test(phoneValue)) {
            isValid = false;
            phoneError.classList.remove('hidden');
        }
        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
