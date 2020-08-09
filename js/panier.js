// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';
var panier = JSON.parse(localStorage.getItem('panier')) || [];
var itemsTotalPrice = 0;

const itemImg = document.querySelector(".item-image");
const itemName = document.querySelector(".item-name");
const itemOption = document.querySelector(".item-option");
const itemQuantity = document.querySelector(".item-quantity");
const itemPrice = document.querySelector(".item-price");
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
            <div class="col-3 font-weight-bold"> <img src="${item.imageUrl}" alt="" class="item-image | img-fluid"></div>
            <div class="item-name | col-2 font-weight-bold d-flex justify-content-center align-items-center"> ${item.name} </div>
            <div class="item-option | col-2 font-weight-bold d-flex justify-content-center align-items-center"> ${item.lenses}</div>
            <div class="col-2 font-weight-bold d-flex justify-content-center align-items-center">
                <input class="item-quantity" type="number" id="quantity" name="quantity" min="0" max="10" step="1" value="1">
            </div>
            <div class="item-price | col-2 font-weight-bold d-flex justify-content-center align-items-center">${item.price /100} €</div>
            <div class="col-1 font-weight-bold d-flex justify-content-center align-items-center">
                <a class="item-delete | btn btn-outline-danger" href="#" role="button">Supprimer</a>
            </div>
        </div>
        <!-- Single item end -->
        `;

    newDiv.innerHTML = display;
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
            item.lenses = lensesOption
            displayingItems(item);
            displayingTotalPrice(item);
        });
    });
});