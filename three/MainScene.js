import * as THREE from "three";
import { Clock } from "./Clock";
import { vertex } from "./shaders/background.vert.js";
import { fragment } from "./shaders/background.frag.js";
import apple from "../assets/images/apple.jpeg"

let testCount = 1;

class _MainScene {
  constructor() {
    this.animate = this.animate.bind(this);
    this.far = 1000;
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      -window.innerHeight / 2,
      window.innerHeight / 2,
      1,
      this.far
    );
    this.camera.position.z = this.far - 1;

    // Perspective camera, use to debug
    // this.camera = new THREE.PerspectiveCamera();
    // this.camera.position.z = 40;
    // this.camera.position.x = this.far/2 - 1;
    // //this.camera.position.y = 40;
    // this.camera.lookAt(this.scene)

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(1);
    //this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.domElement.id = "scene_test";

    this.setupScene();

    if (!document.getElementById("scene_test")) {
      document.getElementById('main').appendChild(this.renderer.domElement);
    }
  }

  /**
   *
   */
  setupScene() {
    // Create Clock
    this.clock = new Clock();

    // Set Lights
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.scene.add(ambientLight);

    // Create Background Plane
    this.createBackground();

    // Create Sphere
    let material = new THREE.MeshNormalMaterial();
    this.sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(20, 20, 10),
      material
    );
    this.sphere.position.z = 20;
    this.scene.add(this.sphere);

    // Launch animation process
    this.animate();
  }

  /**
   *
   */
  animate() {
    // Update sphere position
    let angle = this.clock.elapsedTime() * 0.001;
    this.sphere.position.x = 40 * Math.sin(angle);
    this.sphere.position.y = 40 * Math.cos(angle);

    if (testCount<1) {
      testCount += 0.05;
    } else {
      testCount = 0;
    }
    // this.backgroundMaterial.uniforms.u_current_time = Math.sin(this.clock.elapsedTime()*0.01)*0.5 + 0.5;
    this.backgroundMaterial.uniforms.u_current_time = testCount;
    this.scene.getObjectByName('bg').material = this.backgroundMaterial;

    // Bind function to next frame
    requestAnimationFrame(this.animate);
    // Render ThreeJs Scene
    this.renderScene();
  }

  /**
   *
   */
  renderScene() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   *
   */
  createBackground() {
    // create a background
    const backgroundPlane = new THREE.PlaneBufferGeometry(
      window.innerWidth,
      window.innerHeight,
      32,
    );
    backgroundPlane.dynamic = true;

    let texture = this.createTexture();

    let uniforms = {
      u_time:             { type: "f", value: 1.0 },
      u_current_time:     { type: "f", value: 1.0 },
      u_resolution:       { type: "v2", value: new THREE.Vector2() },
      u_texture:          {type: "t", value: texture}
    };

    uniforms.u_resolution.value.x = window.innerWidth;
    uniforms.u_resolution.value.y = window.innerHeight;

    this.backgroundMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      // derivatives: true
    });

    // Create mesh
    const mesh = new THREE.Mesh(backgroundPlane, this.backgroundMaterial);
    mesh.name = "bg";
    this.scene.add(mesh);

    window.mesh = mesh;
  }

  /**
   *
   * @returns {Texture}
   */
  createTexture() {
    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load(apple,
      function( data ) { },
      // Function called when download progresses
      function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); },
      // Function called when download errors
      function ( xhr ) { console.log( 'An error happened' ); }
    );
    return texture;
  }
}

export const MainScene = new _MainScene();
