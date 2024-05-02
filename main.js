import * as THREE from 'three'
import { GLTFLoader } from 'GLTFLoader'
import { OrbitControls } from 'OrbitControls';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { VRButton } from 'VRButton';
import { TextGeometry } from 'TextGeometry';

//scene, camera, renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

window.addEventListener('resize', handleResize);

let renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setClearColor(0x222222);
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

document.body.appendChild(renderer.domElement)
document.body.appendChild(VRButton.createButton(renderer))





scene.background = new THREE.Color(0xffc670)
scene.fog = new THREE.Fog(0x000000, 8, 180) //숫자가 작을수록 뿌옇고 넓음 //위치,정도?


const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.rotateSpeed = 0.75; //OrbitControls로 회전시킬 때 속도 
controls.enableDamping = true;
// controls.enableZoom = false; //zoom in-out 불가 

//card min, max 회전값설정 ( OrbitControls 수직방향)
controls.minPolarAngle = Math.PI / 2 - Math.PI / 3;
controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3;

// controls.minDistance = 2;
// controls.maxDistance = 80;


// const composer = new EffectComposer(renderer);
// const renderScene = new RenderPass(scene, camera);
// composer.addPass(renderScene);
// const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
// bloomPass.threshold = 0.1;
// bloomPass.radius = 1;
// bloomPass.strength = 100;
// composer.addPass(bloomPass);
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
//해상도, strength, radius, threshold
const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 120, 100, 100)
unrealBloomPass.threshold = 0.1;
unrealBloomPass.radius = 1;
unrealBloomPass.strength = 100;
composer.addPass(unrealBloomPass);

//gltf loader 

let gltfmodel;
let gltfmodel1;
let gltfmodel2;
let gltfmodel3;
let gltfmodel4;


let loader = new GLTFLoader();

//sound play 
// const listener = new THREE.AudioListener();
// camera.add(listener);

// window.addEventListener('click', () => {
//   // AudioContext 시작 코드
//   const audioContext = new AudioContext();

//   // Three.js 오디오 로드 및 재생
//   const audioLoader = new THREE.AudioLoader();
//   const sound = new THREE.PositionalAudio(listener); // listener는 이미 정의되어 있어야 합니다.

//   audioLoader.load('./assets/sound/mysound.mp3', function (buffer) {
//     sound.setBuffer(buffer);
//     sound.setRefDistance(20);
//     sound.play();
//   });
// });


const cubeGeometry = new THREE.IcosahedronGeometry(2);
const cubeMaterial = new THREE.MeshLambertMaterial({
  // color: new THREE.Color(0xcc99ff),
  color: 0xffffff,
  emissive: 0x4a7aff,
  // tranctparency 
  transparent: true,
  opacity: 0.8,
  // visible:true or false,
  //FrontSide, BackSide, DoubleSide
  side: THREE.DoubleSide,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(5, 5, 4)
scene.add(cube);

const octahedronGeometry = new THREE.OctahedronGeometry(2);
const octahedroMaterial = new THREE.MeshLambertMaterial({
  // color: new THREE.Color(0xcc99ff),
  color: 0xffffff,
  emissive: 0xff29f8,
  // tranctparency 
  transparent: true,
  opacity: 0.8,
  // visible:true or false,
  //FrontSide, BackSide, DoubleSide
  side: THREE.DoubleSide,
});
const octa = new THREE.Mesh(octahedronGeometry, octahedroMaterial);
octa.position.set(-8, 5, -6)
octa.scale.set(1.2, 1.2, 1.2)
scene.add(octa);

const torusknotGeometry = new THREE.TorusKnotGeometry(2);
const torusknotMaterial = new THREE.MeshLambertMaterial({
  // color: new THREE.Color(0xcc99ff),
  color: 0xff29f8,
  emissive: 0x1bc700,
  // tranctparency 
  transparent: true,
  opacity: 0.8,
  // visible:true or false,
  //FrontSide, BackSide, DoubleSide
  side: THREE.DoubleSide,
});
const torus = new THREE.Mesh(torusknotGeometry, torusknotMaterial);
torus.position.set(-8, 5, 3)
torus.scale.set(0.8, 0.8, 0.8)
scene.add(torus);

const torusGeometry = new THREE.TorusGeometry(2);
const torusMaterial = new THREE.MeshLambertMaterial({
  // color: new THREE.Color(0xcc99ff),
  color: 0xffffff,
  emissive: 0xff6f00,
  // tranctparency 
  transparent: true,
  opacity: 0.8,
  // visible:true or false,
  //FrontSide, BackSide, DoubleSide
  side: THREE.DoubleSide,
});
const torus2 = new THREE.Mesh(torusGeometry, torusMaterial);
torus2.position.set(8, 5, -4)
torus2.scale.set(0.8, 0.8, 0.8)
scene.add(torus2);

const coneGeometry = new THREE.ConeGeometry(2);
const coneMaterial = new THREE.MeshLambertMaterial({
  // color: new THREE.Color(0xcc99ff),
  color: 0xffffff,
  emissive: 0xffee00,
  // tranctparency 
  transparent: true,
  opacity: 0.8,
  // visible:true or false,
  //FrontSide, BackSide, DoubleSide
  side: THREE.DoubleSide,
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(2, 5, -12)
cone.scale.set(0.8, 3, 0.8)
scene.add(cone);


  

//2층 쓰레기 
loader.load('./models/mygltf/jejuisland2.gltf', function (gltf) {
  gltfmodel = gltf.scene;
  gltfmodel.scale.set(3, 2.5, 3);
  gltfmodel.position.set(0, -4, 0)
  gltfmodel.rotation.z = 0.002;
  gltfmodel.castShadow = true;
  gltfmodel.receiveShadow = true;
  scene.add(gltfmodel);
  // gltfmodel.traverse(function (node) {
  //   if (node.isMesh || node.isLight) {
  //     node.castShadow = true;
  //     node.receiveShadow = true;
  //     node.mapping = THREE.EquirectangularRefractionMapping;
  //   }
  // })




  let pts = [];
  let v3 = new THREE.Vector3();
  gltfmodel.traverse(child => {
    if (child.isMesh) {
      let pos = child.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);

        // Add some randomness to the particle positions
        v3.x += Math.random() * 150;
        v3.y += Math.random() * 150;
        v3.z += Math.random() * 150;

        pts.push(v3.clone());
      }
      const newMaterial = new THREE.MeshNormalMaterial({
        color: 0x40a62b,// Set your desired color
        // Other material properties can be configured here
      });
      child.material = newMaterial;


      // Optionally, configure shadow properties
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  let g = new THREE.BufferGeometry().setFromPoints(pts);
  g.center();

  // Increase the size of the particles
  let m = new THREE.PointsMaterial({ color: 0Xffffff, size: 0.3 });

  let p = new THREE.Points(g, m);
  scene.add(p);
}, undefined, function (error) {
  console.error(err)
})
loader.load('./models/mygltf/dol.gltf', function (gltf) {
  gltfmodel4 = gltf.scene;
  gltfmodel4.scale.set(700,700,700);
  gltfmodel4.position.set(5, 4,20)
  gltfmodel4.rotation.z = 0.002;
  gltfmodel4.castShadow = true;
  gltfmodel4.receiveShadow = true;
  scene.add(gltfmodel4);
  // gltfmodel.traverse(function (node) {
  //   if (node.isMesh || node.isLight) {
  //     node.castShadow = true;
  //     node.receiveShadow = true;
  //     node.mapping = THREE.EquirectangularRefractionMapping;
  //   }  gltfmodel1.traverse(child => {
    gltfmodel4.traverse(child => {
      if (child.isMesh) {

      const newMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        // tranctparency 
        transparent: true,
        opacity:1,
        // visible:true or false,
        //FrontSide, BackSide, DoubleSide
        side: THREE.DoubleSide,


      });
      child.material = newMaterial;
F
      // Optionally, configure shadow properties
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
});

loader.load('./models/mygltf/tree.gltf', function (gltf) {
  gltfmodel3 = gltf.scene;
  gltfmodel3.scale.set(0.02,0.02,0.02);
  gltfmodel3.position.set(-5, 0,-25)
  gltfmodel3.rotation.z = 0.002;
  gltfmodel3.castShadow = true;
  gltfmodel3.receiveShadow = true;
  scene.add(gltfmodel3);
  // gltfmodel.traverse(function (node) {
  //   if (node.isMesh || node.isLight) {
  //     node.castShadow = true;
  //     node.receiveShadow = true;
  //     node.mapping = THREE.EquirectangularRefractionMapping;
  //   }  gltfmodel1.traverse(child => {
    gltfmodel3.traverse(child => {
      if (child.isMesh) {

      const newMaterial = new THREE.MeshNormalMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        // tranctparency 
        transparent: true,
        opacity:1,
        // visible:true or false,
        //FrontSide, BackSide, DoubleSide
        side: THREE.DoubleSide,


      });
      child.material = newMaterial;
F
      // Optionally, configure shadow properties
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
});
loader.load('./models/mygltf/text1.gltf', function (gltf) {
  gltfmodel1 = gltf.scene;
  gltfmodel1.scale.set(2, 2, 2);
  gltfmodel1.position.set(-25, 18, 0)
  gltfmodel1.rotation.z = 0.002;
  gltfmodel1.castShadow = true;
  gltfmodel1.receiveShadow = true;
  scene.add(gltfmodel1);
  // gltfmodel.traverse(function (node) {
  //   if (node.isMesh || node.isLight) {
  //     node.castShadow = true;
  //     node.receiveShadow = true;
  //     node.mapping = THREE.EquirectangularRefractionMapping;
  //   }
  gltfmodel1.traverse(child => {
    if (child.isMesh) {

      const newMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        // tranctparency 
        transparent: true,
        opacity: 0.4,
        // visible:true or false,
        //FrontSide, BackSide, DoubleSide
        side: THREE.DoubleSide,


      });
      child.material = newMaterial;

      // Optionally, configure shadow properties
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
})


loader.load('./models/mygltf/text2.gltf', function (gltf) {
  gltfmodel2 = gltf.scene;
  gltfmodel2.scale.set(2, 2, 2);
  gltfmodel2.position.set(1, 18, 0)
  gltfmodel2.rotation.z = 0.002;
  gltfmodel2.castShadow = true;
  gltfmodel2.receiveShadow = true;
  scene.add(gltfmodel2);
  // gltfmodel.traverse(function (node) {
  //   if (node.isMesh || node.isLight) {
  //     node.castShadow = true;
  //     node.receiveShadow = true;
  //     node.mapping = THREE.EquirectangularRefractionMapping;
  //   }
  gltfmodel2.traverse(child => {
    if (child.isMesh) {

      const newMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        // tranctparency 
        transparent: true,
        opacity: 0.4,
        // visible:true or false,
        //FrontSide, BackSide, DoubleSide
        side: THREE.DoubleSide,
      });
      child.material = newMaterial;

      // Optionally, configure shadow properties
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
})

//Plane 바닥면 
let material = new THREE.MeshPhongMaterial({
  // envMap: texture,
  color: 0x3b55ff,
  // flatShading: true,
});

// let geometryP = new THREE.PlaneGeometry(2000, 2000, 10, 10)
// let plane = new THREE.Mesh(geometryP, material);
// plane.rotation.x = -Math.PI / 2;
// //plane.position.y = -3;
// plane.position.set(0, -2, 0)
// plane.castShadow = true;
// plane.receiveShadow = true;
// scene.add(plane);

let light = new THREE.DirectionalLight(0xFFffff, 10);
light.position.set(0, 600, 0);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 100;
light.shadow.focus = 1;
light.shadow.bias = -0.001;
// const helper = new THREE.DirectionalLightHelper( light, 5 );
// scene.add( helper );
scene.add(light);


camera.position.z = 38;
camera.position.y = 25;

function gltfRotate() {
  //   //쓰레기
  // if (gltfmodel) {
  //   const rotationSpeed = -0.0009; // 회전 속도 (조절 가능)
  //   gltfmodel.rotation.y += rotationSpeed;
  // }

  // if (gltfmodel1) {
  //   const rotationSpeed = 0.002; // 회전 속도 (조절 가능)
  //   gltfmodel1.rotation.y += rotationSpeed;
  // }
  // if (gltfmodel2) {
  //   const rotationSpeed = 0.003; // 회전 속도 (조절 가능)
  //   gltfmodel2.rotation.y += rotationSpeed;
  // }
  if (cube) {
    const rotationSpeed = -0.01; // 회전 속도 (조절 가능)
    cube.rotation.z += rotationSpeed;
  }
  if (octa) {
    const rotationSpeed = 0.01; // 회전 속도 (조절 가능)
    octa.rotation.y += -0.01;
    octa.rotation.x += rotationSpeed;
  }
  if (torus) {
    const rotationSpeed = 0.01; // 회전 속도 (조절 가능)
    torus.rotation.y += -0.01;
    torus.rotation.x += rotationSpeed;
  }
  if (torus2) {
    const rotationSpeed = 0.01; // 회전 속도 (조절 가능)
    torus2.rotation.y += -0.01;
    torus2.rotation.x += rotationSpeed;
  }
  if (cone) {
    const rotationSpeed = 0.01; // 회전 속도 (조절 가능)
    cone.rotation.y += -0.01;
    cone.rotation.x += rotationSpeed;
  }

}



// create an object for the sound to play from
const sphere = new THREE.SphereGeometry(0.1, 100, 30);
const material2 = new THREE.MeshPhongMaterial({ color: 0xff2200 });
const mesh = new THREE.Mesh(sphere, material2);
mesh.position.set(0, 0, 0)
mesh.scale.set(0, 0,)
scene.add(mesh);



function handleResize() {
  //종횡비 조절
  camera.aspect = window.innerWidth / window.innerHeight;
  //camera.updateProjectionMatrix(); 이 code를 호출해야 정상적으로 송출됨 
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //재호출
  renderer.render(scene, camera);
  controls.update();
}


//mouseX, mouseY 활용

function animate() {
  controls.update();
  // Define the panning limits for the camera
  gltfRotate();
  composer.render();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
renderer.xr.enabled = true;
renderer.setAnimationLoop(function () {

  renderer.render(scene, camera);

});

animate()

// bloompass render 하는 코드 
// renderer.setAnimationLoop(() => {
//   //renderer.render(scene, camera);
//   animate()
// });




