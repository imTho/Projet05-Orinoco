// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';
const idUrl = window.location.search;
const urlParams = new URLSearchParams(idUrl);
const idCamera = urlParams.get('id');

var panier = JSON.parse(localStorage.getItem('panier')) || [];

const cameraDOM = document.querySelector(".camera-container");
const cameraName = document.querySelector(".camera-name");
const cameraImg = document.querySelector(".camera-img");
const cameraDescription = document.querySelector(".camera-description");
const cameraPrice = document.querySelector(".camera-price");
const cameraOptions = document.querySelector(".camera-options");

const addToCartButton = document.querySelector(".button-addToCart");

class CartItem {
    constructor(id, option) {
        this.id = id;
        this.option = option;
    }
}

// Getting the camera
async function getCamera() {
    try {
        let result = await fetch(apiUrl + idCamera);
        let data = await result.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

// Displaying the Camera
function displayCamera(camera) {
    cameraName.innerHTML = camera.name;
    cameraImg.src = camera.imageUrl;
    cameraDescription.innerHTML = camera.description;
    cameraPrice.innerHTML = camera.price / 100 + " €";

    //lenses options
    let lenseOption = '';

    camera.lenses.forEach(lense => {
        lenseOption += `
        <option class="camera-option" value="${lense}">${lense}</option>
        `;
    });

    cameraOptions.innerHTML = lenseOption;
}

//Adding to cart
function addToCart(camera) {
    const optionValue = cameraOptions.options[cameraOptions.selectedIndex].value;

    if (panier.some(item => item.id === idCamera) && panier.some(item => item.option === optionValue)) {
        alert("L'objet est deja dans votre panier.");
    } else {
        const item = new CartItem(idCamera, optionValue);
        panier.push(item);
        localStorage.setItem("panier", JSON.stringify(panier));
        //Displaying cart item number
        itemCounter.textContent = "( " + panier.length + " )";
    }
}

// MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    //Getting the camera and displaying
    getCamera().then(camera => {
        displayCamera(camera);
        // Adding to cart and local storage
        addToCartButton.addEventListener("click", () => {
            addToCart(camera)
        });
    });
});