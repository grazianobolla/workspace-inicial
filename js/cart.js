document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + '25801' + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCart(resultObj.data.articles);
            //load from localStorage
            connectListeners(resultObj.data.articles);
        }
    })
});

function showCart(arr) {
    let htmlCode = '';

    arr.forEach((item, index) => {
        htmlCode += `<tr>
            <td><img src="${item.image}" style="width: 40px; height: auto;"></td>
            <td>${item.name}</td>
            <td>USD ${item.unitCost}</td>
            <td><input type="text" placeholder="Cantidad" value="1" id="input-${index}"></td>
            <td><strong id="text-${index}">USD ${item.unitCost}</strong></td>
        </tr>`;
    });

    document.getElementById('cart-table').innerHTML += htmlCode;
}

function connectListeners(arr) {
    const table = document.getElementById('cart-table');

    table.addEventListener('input', e => {
        const amount = e.target.value;
        const index = e.target.id.split('-')[1];
        const strong = document.getElementById('text-' + index);
        const price = arr[index].unitCost;
        strong.innerHTML = 'USD ' + (price * amount);
    });
}