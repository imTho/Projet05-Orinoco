// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';
var itemsTotalPrice = 0;

const itemDisplay = document.querySelector(".item-display");
const totalPrice = document.querySelector(".total-price");

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

//Creating unique Id
function creatingUniqueId() {
    let i = 0;
    panier.forEach(item => {
        i++;
        item.uniqueId = i;
    });
}

//Displaying Items
function displayingItems(item) {
    let display = '';
    let newDiv = document.createElement("div");
    itemDisplay.appendChild(newDiv);

    display += `
         <!-- Single item -->
        <div class="single-item | row bg-white p-2 my-5 rounded" data-id="${item.uniqueId}">
            <div class="col-lg-3 col-md-12 font-weight-bold"> <img src="${item.imageUrl}" alt="" class="item-image | img-fluid"></div>
            <div class="item-name | col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center"> ${item.name} </div>
            <div class="item-option | col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center"> ${item.lenses}</div>
            <div class="col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center"> 
                <div class="item-quantity" data-id="${item.uniqueId}"> 1 </div>
                <div class="quantity-btn | d-flex flex-column pl-3">
                    <i class="quantity-btn-up |  fas fa-chevron-up" data-id="${item.uniqueId}"></i>
                    <i class="quantity-btn-down |  fas fa-chevron-down" data-id="${item.uniqueId}"></i>
                </div>
            </div>
            <div class="item-price | col-lg-2 col-md-6 font-weight-bold d-flex justify-content-center align-items-center" data-id="${item.uniqueId}">${item.price /100} €</div>
            <div class="col-lg-1 col-md-12 font-weight-bold d-flex justify-content-center align-items-center">
                <a class="item-delete | btn btn-outline-danger" href="#" role="button" data-id="${item.uniqueId}">Supprimer</a>
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


    //Increase quantity button
    quantityUp.forEach(btnUp => {

        btnUp.addEventListener("click", (event) => {

            if (event.target.getAttribute("data-id") == item.uniqueId) {
                itemQuantity.forEach(quantity => {

                    if (quantity.getAttribute("data-id") == item.uniqueId) {
                        let qty = parseInt(quantity.textContent, 10);
                        qty++;

                        itemPrice.forEach(price => {
                            if (price.getAttribute("data-id") == item.uniqueId) {
                                quantity.innerHTML = qty;
                                price.innerHTML = qty * item.price / 100 + " €";
                            };
                        });
                    };

                });
            };
            //Uptdating total price
            displayingTotalPrice()
        });
    });

    //Decrease quantity button
    quantityDwn.forEach(btnDwn => {
        btnDwn.addEventListener("click", (event) => {

            if (event.target.getAttribute("data-id") == item.uniqueId) {
                itemQuantity.forEach(quantity => {

                    if (quantity.getAttribute("data-id") == item.uniqueId) {
                        let qty = parseInt(quantity.textContent, 10);
                        qty--;

                        if (qty <= 0) {
                            qty = 1;
                        };

                        itemPrice.forEach(price => {
                            if (price.getAttribute("data-id") == item.uniqueId) {
                                quantity.innerHTML = qty;
                                price.innerHTML = qty * item.price / 100 + " €";
                            };
                        });

                    };
                });
            };
            //Uptdating total price
            displayingTotalPrice()
        });
    });
};

//Deleting item
function deletingItem(item) {
    let itemDeleteBtn = document.querySelectorAll(".item-delete");


    itemDeleteBtn.forEach(btnDelete => {
        btnDelete.addEventListener("click", (event) => {

            if (event.target.getAttribute("data-id") == item.uniqueId) {
                //Deleting from display
                let singleItem = document.querySelectorAll(".single-item");

                singleItem.forEach(div => {
                    if (div.getAttribute("data-id") == item.uniqueId) {
                        div.remove();
                    }
                });

                //Deleting from cart
                let idItem = panier.indexOf(item.uniqueId);
                panier.splice(idItem, 1);
                localStorage.setItem("panier", JSON.stringify(panier));

                //Updating item count
                itemCounter.textContent = "( " + panier.length + " )";

                //Updating total price
                displayingTotalPrice()
            };

        });
    });


};

//Sending Order
function sendOrder() {
    const submitBtn = document.querySelector('.submit-button');
    const form = document.querySelector('.order-form');

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const email = document.getElementById('email').value;

        //Contact
        let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        }

        //Products
        let products = [];
        panier.forEach(item => {
            products.push(item.id);
        });

        //Order
        let order = {
            contact: contact,
            products: products
        }

        //Sending Order(POST)
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(apiUrl + 'order', options)
            .then(order => order.json())
            .then(order => localStorage.setItem('order', JSON.stringify(order)));

        // Redirecting
        setTimeout(() => {
            localStorage.removeItem("panier");
            document.location.href = "./thanks.html";
        }, 1500);
    });
};

//MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");
    creatingUniqueId();

    panier.forEach(item => {
        let lensesOption = item.option;
        let uniqueId = item.uniqueId;

        getItemFromCart(item.id).then(item => {
            //Adding lense option
            item.lenses = lensesOption;
            //Adding uniqueId
            item.uniqueId = uniqueId;
            displayingItems(item);
            selectQuantity(item);
            displayingTotalPrice();
            deletingItem(item);
        });

    });
    sendOrder();
});