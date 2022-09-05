function login() {
    const username = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    if (!checkInput(username, password))
        return;

    window.location.href = "index.html";
    localStorage.setItem("username", username);
}

function checkInput(username, password) {
    if (username.length === 0 || password.length === 0) {
        alert("Invalid input, check your credentials.");
        return false;
    }

    return true;
}