width = window.innerWidth;
height = window.innerHeight;

//-------------------------------------------------------------------------------------
// 3D Scene canvas
//-------------------------------------------------------------------------------------
var scene_3D = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.set(0, 0, 700);

var canvas_3D = new THREE.WebGLRenderer({ antialias: true, alpha: true });
canvas_3D.setSize(width, height);
//document.body.appendChild( canvas_3D.domElement );

var geometry = new THREE.BoxGeometry(500, 500, 500);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.position.z = -500;
cube.rotation.z = -45;
scene_3D.add(cube);

//-------------------------------------------------------------------------------------
// 2D UI canvas
//-------------------------------------------------------------------------------------
var opts = { transparent: false, antialias: true, resolution: window.devicePixelRatio }
var scene_2D = new PIXI.Container();
var canvas_2D = PIXI.autoDetectRenderer(width, height, opts);
canvas_2D.backgroundColor = 0xFF66CC
document.body.appendChild(canvas_2D.view);

//-------------------------------------------------------------------------------------
// Map 3D canvas to 2D Canvas
//-------------------------------------------------------------------------------------

// original 
// var texture_3D = new PIXI.Texture.fromCanvas(canvas_3D.domElement);

var texture_3D = new PIXI.Texture.from(canvas_3D.domElement);
var sprite_3D = new PIXI.Sprite(texture_3D);
scene_2D.addChild(sprite_3D);

//-------------------------------------------------------------------------------------
// Label the PIXI Canvas
//-------------------------------------------------------------------------------------
var label = new PIXI.Text("PIXI Canvas", { fontSize: 24, fill: 0xffffff })
label.position.set(Math.round(width - label.width) / 2, Math.round(height - label.height) / 2)
scene_2D.addChild(label)

//-------------------------------------------------------------------------------------
// Add the stats counter
//-------------------------------------------------------------------------------------
var controls = new THREE.OrbitControls(camera, canvas_2D.view);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

var stats = new Stats();
stats.domElement.id = 'stats'
document.body.appendChild(stats.domElement);

//-------------------------------------------------------------------------------------
// Render Animation
//-------------------------------------------------------------------------------------
function animate() {
  stats.begin()
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0.01
  controls.update()
  canvas_3D.render(scene_3D, camera)
  sprite_3D.texture.update() //tell pixi that threejs changed
  canvas_2D.render(scene_2D)
  requestAnimationFrame(animate)
  stats.end()
}
animate();