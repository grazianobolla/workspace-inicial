let currentProduct = {};

document.addEventListener("DOMContentLoaded", function (e) {
    const prodId = localStorage.getItem("product-id");

    getJSONData(PRODUCT_INFO_URL + prodId + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            showProductInfo(resultObj.data);
            currentProduct = resultObj.data;
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodId + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            showComments(resultObj.data);
        }
    })
});

function buyItem() {
    if (localStorage.getItem('buy-data') === null) {
        localStorage.setItem('buy-data', '[]');
    }

    const localData = localStorage.getItem('buy-data');
    let currentInfo = JSON.parse(localData);

    if (currentInfo.some(e => e.id === currentProduct.id)) {
        window.location.href = "cart.html";
        return;
    }

    currentInfo.push(currentProduct);
    localStorage.setItem('buy-data', JSON.stringify(currentInfo));

    window.location.href = "cart.html";
}

function showProductInfo(productData) {
    setMainInfo(productData);
    setRelatedProducts(productData.relatedProducts);
}

function showComments(commentData) {
    const list = document.getElementById("comment-list");

    commentData.forEach(comment => {
        let prevHtml = '';

        prevHtml += `<li class="list-group-item">`;
        prevHtml += `<strong>${comment.user}</strong> - ${comment.dateTime} - `;

        for (let i = 0; i < 5; i++) {
            prevHtml += `<i class="${i < comment.score ? 'fa fa-star" style="color:orange;"' : 'far fa-star"'}></i>`;
        }
        prevHtml += `<br>${comment.description}</li>`;

        list.innerHTML += prevHtml;
    })
}

function setMainInfo(productData) {
    const productContainer = document.getElementById("product-info");
    productContainer.innerHTML += `
    <div class="d-flex justify-content-between">
        <h2>${productData.name}</h2>
        <button class="btn btn-success" onclick="buyItem()">Comprar</button>
    </div>
    <hr>
    <strong>Precio</strong>
    <p>${productData.currency} ${productData.cost}</p>
    <strong>Descripcion</strong>
    <p>${productData.description}</p>
    <strong>Categoria</strong>
    <p>${productData.category}</p>
    <strong>Cantidad de vendidos</strong>
    <p>${productData.soldCount}</p>
    <strong>Imagenes ilustrativas</strong>
    <p>${productData.category}</p>
    `;

    productData.images.forEach(image => {
        productContainer.innerHTML += `<img class="img-fluid img-thumbnail" src=${image} style="width: 250px; margin:1em">`
    });
}

function setRelatedProducts(productArray) {
    const relatedContainer = document.getElementById("related");

    productArray.forEach(item => {
        relatedContainer.innerHTML += `
        <div class="col-3">
            <div class="card mb-3 shadow cursor-active" onclick="redirectProduct(${item.id})">
                <img class="card-img-top" src="${item.image}" alt="${item.name}">
                <div class="card-body">
                    <h4 class="card-title mb-2">${item.name}</h4>
                </div>
            </div>
        </div>
        `;
    })
}