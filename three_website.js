import * as THREE from './node_modules/three/src/Three.js';

import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

var mouse = { x: 0, y: 0 }
const scene = new THREE.Scene()
const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
camera1.position.z = 2



const scene2 = new THREE.Scene()
const camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )



// Card
// Get card element
const canvas1 = document.getElementById('card1');

const canvas1card = document.getElementById('c1_card');

// Render in the canvas card
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1card })
renderer1.setSize( $(canvas1).width(), $(canvas1).height())


// Canvas Modal
const modal1 = document.getElementById('portfolioModal4');

// Render in the canvas modal
const canvas1modal = document.getElementById('c1') 

const renderer1Modal = new THREE.WebGLRenderer({ canvas: canvas1modal })
renderer1Modal.setSize( $(modal1).width()/2, $(modal1).height()/2)




// // 2nd 3d model

// // Card
// // Get card element
// const canvas2 = document.getElementById('card2');

// const canvas2card = document.getElementById('c2_card');

// // Render in the canvas card
// const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2card })
// renderer2.setSize( $(canvas2).width(), $(canvas2).height())


// // Canvas Modal
// const modal2 = document.getElementById('portfolioModal5');

// // Render in the canvas modal
// const canvas2modal = document.getElementById('c2') 

// const renderer2Modal = new THREE.WebGLRenderer({ canvas: canvas2modal })
// renderer2Modal.setSize( $(modal2).width()/2, $(modal2).height()/2)





// basic cube
// var geometry = new THREE.BoxGeometry( 1, 1, 1)
// var material = new THREE.MeshStandardMaterial( { color: 0xff0051, flatShading: true, metalness: 0, roughness: 1 })
// var cube = new THREE.Mesh ( geometry, material )
// scene2.add( cube )

// // wireframe cube
// var geometry = new THREE.BoxGeometry( 3, 3, 3)
// var material = new THREE.MeshBasicMaterial( {
// 	color: "#dadada", wireframe: true, transparent: true
// })
// var wireframeCube = new THREE.Mesh ( geometry, material )
// scene2.add( wireframeCube )

// // ambient light
// var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
// scene2.add( ambientLight )

// // point light
// var pointLight = new THREE.PointLight( 0xffffff, 1 );
// pointLight.position.set( 25, 50, 25 );
// scene2.add( pointLight );

                                                                                  


var controls = new OrbitControls(camera1, renderer1Modal.domElement);
// var controls2 = new OrbitControls(camera2, renderer2Modal.domElement);


// // to disable zoom
// controls.enableZoom = false;

// // to disable rotation
// controls.enableRotate = false;

// // to disable pan
// controls.enablePan = false;
// controls.update();


// controls = new THREE.OrbitControls( camera1 );



// Gltf modal

// ambient light
var ambientLight = new THREE.AmbientLight ( 0x404040);
scene.add( ambientLight )

// point light
var pointLight = new THREE.PointLight( 0xffffff, 1 );
// pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

const loader = new GLTFLoader();
var model;
loader.load( "remdesivir/scene.gltf", function ( gltf ) {
	gltf.scene.scale.set(0.1,0.1,0.1)
	model = gltf.scene;
	
	scene.add( model );
}, undefined, function ( error ) {
	console.error( error );

} );
ambientLight.target = model;


const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 100, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

scene.add( spotLight );


function animate() {
    requestAnimationFrame(animate)
   
    controls.update();
    // controls2.update();


    render()
}


function control() {
    model.rotationSpeed = 0.005;
    model.scale = 1;
  };



function render() {
    renderer1.render(scene, camera1)
	renderer1Modal.render(scene, camera1)
    // renderer2.render(scene2,camera2)
    // renderer2Modal.render(scene2, camera2)

    
}

//Keyboard event

// document.body.addEventListener('mousemove', mouseHover);
document.body.addEventListener('keydown', keyPressed);

function left_rotate(){
    console.log('left rotate') 
    model.rotateX(0.1);
}


function right_rotate(){
    console.log('right rotate')
    model.rotateY(0.1);
    
}


function start_rotation(){
    controls.autoRotate = true;
    
}

function stop_rotation(){
    controls.autoRotate = false;
   
    
}


function zoom_in(){
    camera1.position.z -= 0.1;
    
}

function zoom_out(){
    camera1.position.z += 0.1;
   
    
}



document.getElementById ("left_rotate_button").addEventListener ("click", left_rotate, false);

document.getElementById ("right_rotate_button").addEventListener ("click", right_rotate, false);

document.getElementById ("play_button").addEventListener ("click", start_rotation, false);

document.getElementById ("pause_button").addEventListener ("click", stop_rotation, false);

document.getElementById ("zoom_in").addEventListener ("click", zoom_in, false);

document.getElementById ("zoom_out").addEventListener ("click", zoom_out, false);



function keyPressed(e){
    
	switch(e.key) {
        case 'KeyS':
            controls.autoRotate = false;
        case 'Enter':
            controls.autoRotate = true;
	  case 'ArrowUp':
      model.rotateX(-0.1);
		  break;
	  case 'ArrowDown':
        controls.autoRotate = false;
		  break;
	  case 'ArrowLeft':
      model.rotateY(-0.1);
		  break;
	  case 'ArrowRight':
      model.rotateY(0.1);
		  break;
	}
	e.preventDefault();
	render();
  }

  function mouseHover(event){
	  console.log("Mouse Hover");
	  // For the following method to work correctly, set the canvas position *static*; margin > 0 and padding > 0 are OK
    mouse.x = ( ( event.clientX - renderer1.domElement.offsetLeft ) / renderer1.domElement.width ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer1.domElement.offsetTop ) / renderer1.domElement.height ) * 2 + 1;
    
    // For this alternate method, set the canvas position *fixed*; set top > 0, set left > 0; padding must be 0; margin > 0 is OK
    //mouse.x = ( ( event.clientX - container.offsetLeft ) / container.clientWidth ) * 2 - 1;
    //mouse.y = - ( ( event.clientY - container.offsetTop ) / container.clientHeight ) * 2 + 1;

    vector.set( mouse.x, mouse.y, 0.5 );
    vector.unproject( camera1 );

    raycaster.set( camera1.position, vector.sub( camera1.position ).normalize() );

    intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {
        
        info.innerHTML = 'INTERSECT Count: ' + ++count;
        
    }
  }

animate()


