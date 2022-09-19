document.addEventListener("DOMContentLoaded", function (e) {
    const prodId = localStorage.getItem("product-id");

    getJSONData(PRODUCT_INFO_URL + prodId + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            showProductInfo(resultObj.data);
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodId + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            showComments(resultObj.data);
        }
    })
});

function showProductInfo(productData) {
    const productContainer = document.getElementById("product-info");
    productContainer.innerHTML +=
        `
    <h2>${productData.name}</h2>
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

function showComments(commentData) {
    const commentContainer = document.getElementById("comments");
    const list = document.getElementById("comment-list");

    commentData.forEach(comment => {
        console.log(comment);
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