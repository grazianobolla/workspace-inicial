document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById('emailInput').value = localStorage.getItem("username");

    const strData = localStorage.getItem("profile");

    if (strData === null) {
        return;
    }

    const data = JSON.parse(strData);

    document.getElementById('nameField').value = data.name;
    document.getElementById('secondNameField').value = data.secondName;
    document.getElementById('lastNameField').value = data.lastName;
    document.getElementById('secondLastNameField').value = data.secondLastName;
    document.getElementById('phoneField').value = data.phone;
});

document.getElementById('profileForm').addEventListener('submit', function (e) {
    const data = {
        name: e.target.nameField.value,
        secondName: e.target.secondNameField.value,
        lastName: e.target.lastNameField.value,
        secondLastName: e.target.secondLastNameField.value,
        phone: e.target.phoneField.value
    };

    localStorage.setItem("profile", JSON.stringify(data));
});