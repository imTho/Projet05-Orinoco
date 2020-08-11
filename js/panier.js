// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';
var itemsTotalPrice = 0;

const itemDisplay = document.querySelector(".item-display");
const totalPrice = document.querySelector(".total-price");

const itemDeleteBtn = document.querySelector(".item-delete");

//Getting Items from cart
async function getItemFromCart(id) {
    try {
        let result = await fetch(apiUrl + id);
        let data = await result.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

//Displaying Items
function displayingItems(item) {
    let display = '';
    let newDiv = document.createElement("div");
    itemDisplay.appendChild(newDiv);

    display += `
         <!-- Single item -->
        <div class="single-item | row bg-white p-2 my-5 rounded">
            <div class="col-lg-3 col-md-12 font-weight-bold"> <img src="${item.imageUrl}" alt="" class="item-image | img-fluid"></div>
            <div class="item-name | col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center"> ${item.name} </div>
            <div class="item-option | col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center"> ${item.lenses}</div>
            <div class="col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center"> 
                <div class="item-quantity" data-id="${item._id}"> 1 </div>
                <div class="quantity-btn | d-flex flex-column pl-3">
                    <i class="quantity-btn-up |  fas fa-chevron-up" data-id="${item._id}"></i>
                    <i class="quantity-btn-down |  fas fa-chevron-down" data-id="${item._id}"></i>
                </div>
            </div>
            <div class="item-price | col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center" data-id="${item._id}">${item.price /100} €</div>
            <div class="col-lg-1 col-md-12 font-weight-bold d-flex justify-content-center align-items-center">
                <a class="item-delete | btn btn-outline-danger" href="#" role="button" data-id="${item._id}">Supprimer</a>
            </div>
        </div>
        <!-- Single item end -->
        `;

    newDiv.innerHTML = display;
}

//Total Price
function displayingTotalPrice() {

    let itemPrice = document.querySelectorAll(".item-price");
    let itemsTotalPrice = 0;

    itemPrice.forEach(price => {
        itemsTotalPrice += parseInt(price.textContent, 10);
    });

    totalPrice.innerHTML = itemsTotalPrice + " €";
}

//Item quantity
function selectQuantity(item) {
    let itemQuantity = document.querySelectorAll(".item-quantity");
    let quantityUp = document.querySelectorAll(".quantity-btn-up");
    let quantityDwn = document.querySelectorAll(".quantity-btn-down");
    let itemPrice = document.querySelectorAll(".item-price");



    quantityUp.forEach(btnUp => {
        btnUp.addEventListener("click", (event) => {

            if (event.target.getAttribute("data-id") === item._id) {
                itemQuantity.forEach(quantity => {

                    if (quantity.getAttribute("data-id") === item._id) {
                        let qty = parseInt(quantity.textContent, 10);
                        qty++;

                        itemPrice.forEach(price => {
                            if (price.getAttribute("data-id") === item._id) {
                                quantity.innerHTML = qty;
                                price.innerHTML = qty * item.price / 100 + " €";
                            };
                        });
                    };

                });
            };
            displayingTotalPrice()
        });
    });

    quantityDwn.forEach(btnDwn => {
        btnDwn.addEventListener("click", (event) => {

            if (event.target.getAttribute("data-id") === item._id) {
                itemQuantity.forEach(quantity => {

                    if (quantity.getAttribute("data-id") === item._id) {
                        let qty = parseInt(quantity.textContent, 10);
                        qty--;

                        if (qty <= 0) {
                            qty = 1;
                        };

                        itemPrice.forEach(price => {
                            if (price.getAttribute("data-id") == item._id) {
                                quantity.innerHTML = qty;
                                price.innerHTML = qty * item.price / 100 + " €";
                            };
                        });

                    };
                });
            };
            displayingTotalPrice()
        });
    });
};

//MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    panier.forEach(item => {
        let lensesOption = item.option;
        getItemFromCart(item.id).then(item => {
            item.lenses = lensesOption;
            displayingItems(item);
            selectQuantity(item);
            displayingTotalPrice()
        });
    });
});