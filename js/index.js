document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        redirectCategory(101);
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        redirectCategory(102);
    });
    document.getElementById("muebles").addEventListener("click", function () {
        redirectCategory(103);
    });

});