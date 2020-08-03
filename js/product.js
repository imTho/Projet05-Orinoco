// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';
const idUrl = window.location.search;
const idCamera = idUrl.substr(4);

const cameraDOM = document.querySelector(".camera-container");
const cameraName = document.querySelector(".camera-name");
const cameraImg = document.querySelector(".camera-img");
const cameraDescription = document.querySelector(".camera-description");
const cameraPrice = document.querySelector(".camera-price");
const cameraOptions = document.querySelector(".camera-options");

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
    cameraPrice.innerHTML = camera.price / 1000 + " €";

    //lenses options
    let lenseOption = '';

    camera.lenses.forEach(lense => {
        lenseOption += `
        <option value="${lense}">${lense}</option>
        `;
    });

    cameraOptions.innerHTML = lenseOption;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    //Getting the camera and displaying
    getCamera().then(camera => displayCamera(camera));
});