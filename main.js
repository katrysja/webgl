import * as THREE from './node_modules/three/build/three.module.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  
  const scene = new THREE.Scene();
  
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  
 // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // add shadows for cube
  
  {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  
 // const cube = new THREE.Mesh(geometry, material);
  //scene.add(cube);
  
  //renderer.render(scene, camera);
  
  // add animation to show cube
  
  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    cube.position.x = x;
    
    return cube;
  }
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];
  function render(time) {
    time *= 0.001;  // конвертировать время в секунды
    
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    renderer.render(scene, camera);
    // check size of device;
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
    
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
