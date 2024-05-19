import * as THREE from 'three'
import { GLTFLoader } from 'GLTFLoader'
import { OrbitControls } from 'OrbitControls';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { VRButton } from 'VRButton';
// import { TextGeometry } from 'TextGeometry';

window.addEventListener('load', function () {
  init();
});
async function init() {
  var raycaster, mouse, container;
  //scene, camera, renderer
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  // let mouse = new THREE.Vector2(), SELECTED;
  // let radius = 100, theta = 0;
  // let container = document.getElementById( 'webdolRayCaster' );
  container = document.createElement('div');
  document.body.appendChild(container);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2()


  const loadingManager = new THREE.LoadingManager();

  const gltfLoader = new GLTFLoader(loadingManager);

  window.addEventListener('resize', handleResize);

  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setClearColor(0x222222);
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.setPixelRatio(window.devicePixelRatio);//기기에 맞게 pixel value조절
  // renderer.setClearColor(0xf0f0f0);

  document.body.appendChild(renderer.domElement)
  document.body.appendChild(VRButton.createButton(renderer))



  scene.background = new THREE.Color(0x000000)
  // scene.fog = new THREE.Fog(0xfff9cf, 1, 0.01) //숫자가 작을수록 뿌옇고 넓음 //위치,정도?


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.rotateSpeed = 0.75; //OrbitControls로 회전시킬 때 속도 
  controls.enableDamping = true;
  controls.minDistance = 2; // Minimum distance for zoom
  controls.maxDistance = 700; // Maximum distance for zoom

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  //해상도, strength, radius, threshold
  const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 120, 100, 100)
  unrealBloomPass.threshold = 0.1;
  unrealBloomPass.radius = 1;
  unrealBloomPass.strength = 100;
  composer.addPass(unrealBloomPass);

  let gltfmodel;
  let gltfmodel1;
  let gltfmodel2;
  let gltfmodel3;
  let gltfmodel4;
  let gltfmodel5;
  let gltfmodel6;
  let gltfmodel7;
  let gltfmodel8;
  let gltfmodel9;
  let gltfmodel10;
  let a = 0;
  //1cube
  let geometry = new THREE.DodecahedronGeometry();

  for (let i = 0; i < 1600; i++) {
    let grey = Math.random();
    let object = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(0Xbababa),
        // wireframe: true,
        opacity:0.4,
        transparent: true
      })
    );

    object.position.x = Math.random() * 2000 - 800;
    object.position.y = Math.random() * 2000 - 800;
    object.position.z = Math.random() * 2000 - 800;
    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    // object.scale.set(10, 10, 10)
    object.scale.x = Math.random() + 25;
    object.scale.y = Math.random() + 25;
    object.scale.z = Math.random() + 25;
    scene.add(object);
  }


  let loader = new GLTFLoader();




  const cubeGeometry = new THREE.IcosahedronGeometry(2);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color(0xcc99ff),
    color: 0x4a7aff,
    emissive: 0x4a7aff,
    // tranctparency 
    transparent: true,
    // wireframe:true,
    // opacity: 0.8,
    // visible:true or false,
    //FrontSide, BackSide, DoubleSide
    side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(50, 20, -40);
  cube.scale.set(8, 8, 8)

  // if (intersects.length > 0) {
  //   window.open(intersects[0].object.userData.URL);
  // }
  scene.add(cube);



  loader.load('./models/mygltf/island new.gltf', function (gltf) {
    gltfmodel1 = gltf.scene;
    gltfmodel1.scale.set(500, 500, 500);
    gltfmodel1.position.set(0, -20, 0)
    gltfmodel1.rotation.z = 0.002;
    gltfmodel1.castShadow = true;
    gltfmodel1.receiveShadow = true;
    scene.add(gltfmodel1);

    gltfmodel1.traverse(child => {
      if (child.isMesh) {
        let pos = child.geometry.attributes.position;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  })




  for (let i = 0; i < 20; i++) {
  loader.load('./models/mygltf/dol.gltf', function (gltf) {
    gltfmodel4 = gltf.scene;
    gltfmodel4.scale.set(44000, 44000, 44000);
    gltfmodel4.position.set(2000* Math.random(), -2000* Math.random(), 2000* Math.random())
    gltfmodel4.rotation.y = 100*Math.random();
    gltfmodel4.rotation.x = 100*Math.random();
    gltfmodel4.rotation.z = 100*Math.random();
    gltfmodel4.castShadow = true;
    gltfmodel4.receiveShadow = true;
    
    scene.add(gltfmodel4);

    gltfmodel4.traverse(child => {
      if (child.isMesh) {

        const newMaterial = new THREE.MeshLambertMaterial({
          // color: 0xffffff,
          // emissive: 0x000000,
          // tranctparency 
          transparent: true,
          opacity: 1,
          wireframe: true,
          // visible:true or false,
          //FrontSide, BackSide, DoubleSide
          side: THREE.DoubleSide,
        });     
        child.material = newMaterial;
      }
    });
  });
}

for (let i = 0; i < 20; i++) {
  loader.load('./models/mygltf/dol.gltf', function (gltf) {
    gltfmodel4 = gltf.scene;
    gltfmodel4.scale.set(44000, 44000, 44000);
    gltfmodel4.position.set(-2000* Math.random(), 2000* Math.random(), -2000* Math.random())
    gltfmodel4.rotation.y = 100*Math.random();
    gltfmodel4.rotation.x = 100*Math.random();
    gltfmodel4.rotation.z = 100*Math.random();
    gltfmodel4.castShadow = true;
    gltfmodel4.receiveShadow = true;
    scene.add(gltfmodel4);

    gltfmodel4.traverse(child => {
      if (child.isMesh) {

        const newMaterial = new THREE.MeshLambertMaterial({
          // color: 0xffffff,
          // emissive: 0x000000,
          // tranctparency 
          transparent: true,
          opacity: 0.2,
          wireframe: true,
          // visible:true or false,
          //FrontSide, BackSide, DoubleSide
          side: THREE.DoubleSide,
        });     
        child.material = newMaterial;
      }
    });
  });
}
  const gltf = await gltfLoader.loadAsync('./models/mygltf/character2.gltf');
  const mygltf = gltf.scene
  mygltf.position.set(0, 6, 200);
  mygltf.scale.set(0.7, 0.7, 0.7);
  mygltf.rotation.y = 10;
  mygltf.castShadow = true;
  mygltf.receiveShadow = true;
  mygltf.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(mygltf);

  let light = new THREE.DirectionalLight(0xfff9cf, 3.1);
  light.position.set(100, 1000, 0);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.receiveShadow = true
  light.shadow.camera.top = 2500;
  light.shadow.camera.bottom = -2500;
  light.shadow.camera.left = 2500;
  light.shadow.camera.right = -2500;
  light.shadow.mapSize.width = 8148;
  light.shadow.mapSize.height = 8148;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 2000;

  light.shadow.radius = 1;
  light.shadow.blurSamples = 205;
  light.shadow.focus = 1;
  light.shadow.bias = -0.001;;
;
  scene.add(light);

  const Light2 = new THREE.AmbientLight(0xffffff, .4)
  Light2.castShadow = true;
  Light2.position.set(0, 900, 0)
  scene.add(Light2)

  // const ambientLight = new THREE.AmbientLight(0xffffff, .3)
  // scene.add(ambientLight)



  //카메라 초기 위치
  camera.position.set(250, 550, 250); // 시작 위치 (x, y, z)
  camera.lookAt(0, 0, 0);
  // 목표 카메라 위치 설정
  const mytargetPosition = new THREE.Vector3(0, 42, 25);
  // 애니메이션 변수 설정
  const animationDuration = 80000; // 애니메이션 지속 시간 (ms)

  let animationStart = null;
  let t = 0.05;
  // camera.position.z = 138;
  // camera.position.y = 125;

  //초기 페이지 로드시 애니메이션 
  function myanimate(timestamp) {
    if (!animationStart) animationStart = timestamp;
    const elapsed = timestamp - animationStart;

    // 보간된 카메라 위치 계산 (선형 보간)
    const progress = Math.min(elapsed / animationDuration, t); // 0부터 1까지의 진행도
    const interpolatedPosition = new THREE.Vector3()
      .copy(camera.position)
      .lerp(mytargetPosition, progress); // 선형 보간

    camera.position.copy(interpolatedPosition);

    // 카메라가 목표 위치에 도달하면 애니메이션 종료
    if (progress < t) {
      requestAnimationFrame(myanimate);
    }
    else {
      myanimate = false;
    }
    renderer.render(scene, camera);
    // console.log(progress)
  }
  requestAnimationFrame(myanimate);

  function gltfRotate() {

    if (cube) {
      const rotationSpeed = -0.01; // 회전 속도 (조절 가능)
      cube.rotation.z += rotationSpeed;
    }
    // if (gltfmodel1) {
    //   const rotationSpeed = 0.0001; // 회전 속도 (조절 가능)
    //   gltfmodel1.rotation.y += rotationSpeed;
    // }



  }



  window.addEventListener('mousemove', onMove, false);
  // window.addEventListener('mousemove', onMoveAll, false);
  window.addEventListener('resize', onWindowResize, false);

  function resetModelColor() {
    cube.traverse(function (node) {
      if (cube.isMesh) {
        // 원래의 색상으로 설정 (여기서는 하얀색)
        node.material.color.set(0xffffff);
      }
    });
  }
  function onMove() {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(cube, true);

    if (intersects.length > 0) {

      var objects = intersects[0].object;

      objects.material.color.set(0xfe0000);
    } else {
      resetModelColor()
    }
    if (intersects.length > 0) {
      document.body.style.cursor = 'pointer';
    } else {
      // 교차된 객체가 없는 경우 기본 커서로 변경
      document.body.style.cursor = 'auto';
    }
    render();
  }


  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

  }
  let targetPosition = new THREE.Vector3(10, 10, 10); // 이동할 목표 위치
  let duration = 1000; // 애니메이션 지속 시간 (밀리초)
  let startTime = null; // 애니메이션 시작 시간
  let initialPosition = camera.position.clone(); // 현재 카메라 위치

  function animateCamera() {
    let now = Date.now();
    if (startTime === null) {
      startTime = now;
    }
    let elapsed = now - startTime;
    let t = Math.min(1, elapsed / duration); // 애니메이션 진행도 (0부터 1까지)

    // 보간된 위치 계산 (선형 보간)
    let interpolatedPosition = initialPosition.clone().lerp(targetPosition, t);

    // 카메라 위치 설정
    camera.position.copy(interpolatedPosition);

    // 애니메이션 종료 검사
    if (t < 1) {
      requestAnimationFrame(animateCamera);
    } else {
      controls.enabled = true; // 애니메이션 종료 후 컨트롤 활성화
    }
  }
  function onClick(e) {
    e.preventDefault();
    controls.enabled = false;
    initialPosition = camera.position.clone();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([cube], true);
    if (intersects.length > 0) {

      // 클릭된 객체의 URL로 새 창 열기
      // window.open('https://openai.com/index/chatgpt', '_blank');
      targetPosition.set(100, 10, 50); // 목표 위치 설정
      startTime = null; // 애니메이션 시작 시간 초기화
      animateCamera(); // 카메라 애니메이션 시작

    }
    else {
      controls.enabled = true;
    }
  }
  window.addEventListener('click', onClick, false);


  // 키보드 입력 상태를 저장하는 객체
  const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  };

  // 키보드 이벤트 리스너 등록
  window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.code)) {
      keys[event.code] = true;
    }
  });

  window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.code)) {
      keys[event.code] = false;
    }
  });

  // Character의 초기 위치와 이동 속도 정의
  const cubePosition = new THREE.Vector3(20, 20, 45);
  const moveSpeed = 0.5;
  const rotateSpeed = 1;

  function updateCubePosition() {
    if (keys['ArrowUp']) {
      cubePosition.z -= moveSpeed;
    }
    if (keys['ArrowDown']) {
      cubePosition.z += moveSpeed;
    }
    if (keys['ArrowLeft']) {
      cubePosition.x -= rotateSpeed;
      mygltf.rotation.y += 0.03;
    }
    if (keys['ArrowRight']) {
      cubePosition.x += rotateSpeed;
      mygltf.rotation.y -= 0.03;
    }

    // Cube의 위치 업데이트
    mygltf.position.copy(cubePosition);
    // 큐브를 타겟으로 지정
    const cubeTarget = mygltf.position.clone();

    // 카메라 타겟 설정
    camera.lookAt(cubeTarget);
    // camera.position.z = (cube.position.z + 10)
  }


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


  const mixer = new THREE.AnimationMixer(mygltf);
  const hasAnimation = gltf.animations.length !== 0;

  document.addEventListener('keydown', function (event) {
    // 눌린 키의 keyCode 또는 key를 확인하여 화살표 키인지 확인
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (hasAnimation) {
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      } else {
        hasAnimation = false;
      }
    }
  });

  const clock = new THREE.Clock();

  function animate() {


    const delta = clock.getDelta();
    mixer.update(delta);
    controls.update();
    gltfRotate();
    updateCubePosition();

    composer.render();
    renderer.render(scene, camera);

    //전체 회전함 
    // scene.traverse(function (cube) {
    //   if (cube instanceof THREE.Mesh) {
    //     cube.rotation.x += 0.01; // X 축 회전
    //     cube.rotation.y += 0.02; // Y 축 회전
    //     cube.rotation.z += 0.03; // Z 축 회전
    //   }

    // });

    requestAnimationFrame(animate);
  }
  renderer.xr.enabled = true;

  renderer.setAnimationLoop(function () {

    renderer.render(scene, camera);

  });


  animate()




}