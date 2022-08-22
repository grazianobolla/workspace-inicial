function login() {
    if (checkInput()) {
        window.location.replace("homepage.html");
        console.log("success");
    }
}

function checkInput() {
    const mail = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    if (mail.length === 0 || password.length === 0) {
        alert("Invalid input, check your credentials.");
        return false;
    }

    return true;
}