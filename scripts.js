function validateDate() {
    const input = document.getElementById("birthdate").value.trim();
    const msg = document.getElementById("message");
    msg.textContent = '';

    // Empty input check
    if (input === "") {
        msg.textContent = "Please enter your birthdate.";
        return;
    }

    // Separate input into DD / MM / YYYY format
    const parts = input.split('/');
    if (parts.length !== 3) {
        msg.textContent = "Invalid date. Please use DD/MM/YYYY.";
        return;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // months are 0-indexed in JS
    const year = parseInt(parts[2], 10);

    // Check for valid numbers
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        msg.textContent = "Invalid date. Please use DD/MM/YYYY.";
        return;
    }

    const birthDate = new Date(year, month, day);

    //  calendar date check
    if (
        birthDate.getFullYear() !== year ||
        birthDate.getMonth() !== month ||
        birthDate.getDate() !== day
    ) {
        msg.textContent = "Invalid calendar date.";
        return;
    }

    const today = new Date();

    // Future date check
    if (birthDate > today) {
        msg.textContent = "Date cannot be in the future.";
        return;
    }

    // ✅ AGE CALCULATION
    let age = today.getFullYear() - birthDate.getFullYear();

    const isBirthdayToday =
        today.getMonth() === birthDate.getMonth() &&
        today.getDate() === birthDate.getDate();

    const birthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
         today.getDate() >= birthDate.getDate());

    if (!birthdayThisYear) {
        age -= 1;
    }

    // ✅ Age range check
    if (age < 0 || age > 130) {
        msg.textContent = "That age doesn't look right. Please enter a valid birthdate.";
        return;
    }

    // Final message
    msg.textContent = isBirthdayToday
        ? `🎉 Happy Birthday! You are ${age} years old today.`
        : `✅ Valid birthdate. Age: ${age}`;
}

// Run after the DOM loads
window.onload = function () {
    document.getElementById("birthdateForm").addEventListener("submit", function (e) {
        e.preventDefault(); // prevent page reload
        validateDate();
    });
};
