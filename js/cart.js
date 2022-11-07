const USD_PRICE = 40;
const BUY_FORM = document.getElementById('main-form');

let itemData = [];
let currentShipping100 = 5;

document.addEventListener("DOMContentLoaded", function () {
    let dataArray = JSON.parse(localStorage.getItem('buy-data'));
    //sync all prices to USD
    dataArray = dataArray.map(item => {
        if (item.currency === 'UYU') {
            item.cost /= USD_PRICE;
        }

        return item;
    });

    itemData = dataArray;

    showCart(dataArray);
    updateSubtotals(dataArray);

    setEnabled('credit');
});

function showCart(arr) {
    let htmlCode = '';

    arr.forEach((item, index) => {
        htmlCode += `<tr>
            <td><img src="${item.images[0]}" style="width: 40px; height: auto;"></td>
            <td>${item.name}</td>
            <td>USD ${item.cost}</td>
            <td><input type="text" placeholder="Cantidad" value="1" oninput="updatePrice(this.value, ${item.cost}, ${item.id})"></td>
            <td><strong id="text-${item.id}">USD ${item.cost}</strong></td>
        </tr>`;
    });

    document.getElementById('cart-table').innerHTML += htmlCode;
}

function setShipping(percentage) {
    currentShipping100 = percentage;
    updateSubtotals(itemData);
}

function updatePrice(value, cost, id) {
    document.getElementById('text-' + id).innerHTML = 'USD ' + (value * cost);

    const foundItem = itemData.find(e => e.id === id);

    if (foundItem !== undefined && foundItem.amount !== value) {
        foundItem.amount = value;
    } else if (foundItem === undefined) {
        itemData.push({ id: id, amount: value, cost: cost });
    }

    updateSubtotals(itemData);
}

function updateSubtotals(dataArray) {
    const subtotal = document.getElementById('subtotal');
    const shipping = document.getElementById('shipping');
    const total = document.getElementById('total');

    let subtotalAmount = 0;

    dataArray.forEach(e => {
        subtotalAmount += e.cost * (e.amount || 1);
    });

    subtotal.innerHTML = 'USD ' + subtotalAmount;
    currentSubtotal = subtotalAmount;

    const shippingFee = (currentShipping100 * subtotalAmount / 100);
    shipping.innerHTML = 'USD ' + shippingFee;

    total.innerHTML = 'USD ' + (subtotalAmount + shippingFee);
}

function setEnabled(option) {
    if (option === 'credit') {
        document.getElementById('card').removeAttribute('disabled');
        document.getElementById('code').removeAttribute('disabled');
        document.getElementById('date').removeAttribute('disabled');
        document.getElementById('account-number').setAttribute('disabled', '');
        return;
    }

    document.getElementById('card').setAttribute('disabled', '');
    document.getElementById('code').setAttribute('disabled', '');
    document.getElementById('date').setAttribute('disabled', '');
    document.getElementById('account-number').removeAttribute('disabled');
}

BUY_FORM.addEventListener('submit', function (event) {
    event.preventDefault();

    if (BUY_FORM.checkValidity()) {
        document.getElementById("success").classList.add("show");
        return;
    }


});