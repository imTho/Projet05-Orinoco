// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';
var itemsTotalPrice = 0;

const orderName = document.querySelector(".thanks-name");
const orderId = document.querySelector(".thanks-id");

//Getting order
async function getOrder() {
    return JSON.parse(localStorage.getItem('order'));
};

function displayThanks(order) {

    orderName.textContent = order.contact['firstName'];
    orderId.textContent = order.orderId;

    // Clear localStorage
    setTimeout(() => {
        localStorage.removeItem("order");
    }, 1500);
};


//MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    getOrder().then(order => {
        displayThanks(order);
    })
});