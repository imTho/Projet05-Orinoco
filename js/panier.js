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
                <div class="item-quantity"> 1 </div>
                <div class="quantity-btn | d-flex flex-column pl-3">
                    <i class="quantity-btn-up |  fas fa-chevron-up" data-id="${item._id}"></i>
                    <i class="quantity-btn-down |  fas fa-chevron-down" data-id="${item._id}"></i>
                </div>
            </div>
            <div class="item-price | col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center" data-id="${item._id}">${item.price /100} €</div>
            <div class="col-lg-1 col-md-12 font-weight-bold d-flex justify-content-center align-items-center">
                <a class="item-delete | btn btn-outline-danger" href="#" role="button">Supprimer</a>
            </div>
        </div>
        <!-- Single item end -->
        `;

    newDiv.innerHTML = display;
}

//Item quantity
function selectQuantity(item) {
    let itemQuantity = document.querySelector(".item-quantity");
    let quantityUp = document.querySelector(".quantity-btn-up");
    let quantityDwn = document.querySelector(".quantity-btn-down");
    let itemPrice = document.querySelector(".item-price");

    quantityUp.addEventListener("click", () => {
        let quantity = parseInt(itemQuantity.textContent, 10);
        console.log(quantity);
        quantity++;
        itemQuantity.innerHTML = quantity;
        itemPrice.innerHTML = quantity * item.price / 100 + " €";
    });

    quantityDwn.addEventListener("click", () => {
        let quantity = parseInt(itemQuantity.textContent, 10);
        console.log(quantity);
        quantity--;
        if (quantity <= 0) {
            quantity = 1;
        }
        itemQuantity.innerHTML = quantity;
        itemPrice.innerHTML = quantity * item.price / 100 + " €";
    });
}

//Total Price
function displayingTotalPrice(item) {
    itemsTotalPrice += item.price;
    totalPrice.innerHTML = itemsTotalPrice / 100 + " €";
}

//MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    panier.forEach(item => {
        let lensesOption = item.option;
        getItemFromCart(item.id).then(item => {
            item.lenses = lensesOption;
            displayingItems(item);
            selectQuantity(item);
            displayingTotalPrice(item);

            console.log(item);
        });
    });
});