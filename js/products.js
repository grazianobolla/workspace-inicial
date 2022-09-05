const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_COST_A = "COST_A";
const ORDER_BY_COST_D = "COST_D";
const ORDER_BY_REL = "REL";

let currentProductArray = [];
let currentSortCriteria = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_COST_A || criteria === ORDER_BY_COST_D) {
        result = array.sort(function (a, b) {

            //var switch, no code repeated!
            if (criteria == ORDER_BY_COST_D) {
                let pB = b;
                b = a;
                a = pB;
            }

            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_REL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductArray = productsArray;
    }

    currentProductArray = sortProducts(currentSortCriteria, currentProductArray);

    showProducts();
}

function showProducts() {
    const productArray = currentProductArray;

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

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductArray = resultObj.data.products;
            showProducts();
        }
    })

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCostA").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_COST_A);
    });

    document.getElementById("sortByCostD").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_COST_D);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_REL);
    });
});