document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_101_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showProducts(resultObj.data);
        }
    })
});

function showProducts(jsonData) {
    const productArray = jsonData.products;

    let htmlContentToAppend = "";

    productArray.forEach(product => {
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
    });

    document.getElementById('prod-list-container').innerHTML = htmlContentToAppend;
}