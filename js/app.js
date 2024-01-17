// Importing styles and necessary libraries
import '../styles/app.scss';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import gsap from 'gsap';

// Creating a WebGLRenderer
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Setting the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);

// Appending the renderer to the document body
document.body.appendChild(renderer.domElement);

// Creating a Three.js scene
const scene = new THREE.Scene();

// Creating a perspective camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setting the clear color of the renderer
renderer.setClearColor(0XA3A3A3);

// Setting the initial position and look-at coordinates for the camera
camera.position.set(-1.7, 0, 8.7);
camera.lookAt(1.7, 0, 8.7);

// Creating a LoadingManager for asset loading
const loadingManager = new THREE.LoadingManager();

// Getting the progress bar element
const progressBar = document.getElementById('progress-bar');

// Handling loading progress
loadingManager.onProgress = function (url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
};

// Getting the progress bar container element
const progressBarContainer = document.querySelector('.progress-bar-container');

// Handling loading completion
loadingManager.onLoad = function () {
    progressBarContainer.style.display = 'none';
};

// Creating a GLTFLoader for loading 3D models
const gltfLoader = new GLTFLoader(loadingManager);

// Setting output encoding and tone mapping for the renderer
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// Initializing the position variable
let position = 0;

// Loading the 3D model
gltfLoader.load("./assets/the_king_s_hall/scene.gltf", function (gltf) {

    // Adding the loaded model to the scene
    const model = gltf.scene;
    scene.add(model);

    // Determining the type of wheel event for the user's input device
    let wheelEvent = 'onwheel' in document ? 'wheel' : 'mousewheel';

    // Handling wheel events for camera movement
    window.addEventListener(wheelEvent, function (event) {
        const delta = Math.sign(event.deltaY);

        // Switching camera position based on the current position
        switch (position) {
            case 0:
                moveCamera(-1.8, 1.6, 5);
                rotateCamera(0, 0.1, 0);
                position = 1;
                break;
            case 1:
                moveCamera(2.8, 0, 3.6);
                rotateCamera(0, -2, 0);
                position = 2;
                break;
            case 2:
                moveCamera(2.5, -0.9, 12.2);
                rotateCamera(0.9, 0.6, -0.6);
                position = 3;
                break;
            case 3:
                moveCamera(-2.7, 0.6, 3.7);
                rotateCamera(0.6, 1.9, -0.6);
                position = 4;
                break;
            case 4:
                moveCamera(-1.7, 0, 8.7);
                rotateCamera(0, 4.7, 0);
                position = 5;
                break;
            case 5:
                moveCamera(0.5, 0.8, 10);
                rotateCamera(0.3, 1.65, -0.3);
                position = 0;
        }
    });

    // Function to animate camera movement
    function moveCamera(x, y, z) {
        gsap.to(camera.position, {
            x, y, z, duration: 3
        });
    }

    // Function to animate camera rotation
    function rotateCamera(x, y, z) {
        gsap.to(camera.rotation, {
            x, y, z, duration: 3.2
        });
    }

});

// Function to render the scene
function animate() {
    renderer.render(scene, camera);
}

// Setting up animation loop
renderer.setAnimationLoop(animate);

// Handling window resize event
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Adding click event listener to the #audio-visual element
const audioVisualElement = document.getElementById('audio-visual');

// Checking if the audio-visual element exists
if (audioVisualElement) {
    // Adding click event listener to play/pause audio and animate wires
    audioVisualElement.addEventListener('click', function () {
        playPause();
    });
}

// Function to play/pause audio and animate wires
function playPause() {
    const musicElement = document.getElementById("music");

    if (musicElement.paused) {
        musicElement.play();

        for (let i = 1; i <= 6; i++) {
            const audioWire = document.querySelector(`.audio-wire-${i}`);
            audioWire.style.animationPlayState = "running";
        }
    } else {
        musicElement.pause();

        for (let i = 1; i <= 6; i++) {
            const audioWire = document.querySelector(`.audio-wire-${i}`);
            audioWire.style.animationPlayState = "paused";
        }
    }
}
