import React, {Component} from 'react'
import * as THREE from 'three'
import {Clock} from './Clock'
import {vertex} from './shaders/background.vert.js'
import {fragment} from './shaders/background.frag.js'

export class Scene extends Component {
   constructor(state) {
      super(state);
      this.animate = this.animate.bind(this)
   }

   componentDidMount() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, -window.innerHeight, window.innerHeight, 1, 2000)
      this.camera.position.y = 400;

      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(1);
      this.renderer.setClearColor( 0x000000, 0 );
      this.renderer.domElement.id = "scene_test";

      this.initialize();

      if (!document.getElementById('scene_test')) {
         document.body.appendChild( this.renderer.domElement );
      }
   }

   /**
    *
    */
   initialize() {

      // Create Clock
      this.clock = new Clock();

      // Set Lights
      let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
      this.scene.add( ambientLight );

      // Create Background Plane
      this.createBackground();

      // Create Sphere
      let material = new THREE.MeshNormalMaterial();
      this.sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 75, 20, 10 ), material );
      this.scene.add( this.sphere );

      // Launch animation process
      this.animate();
   }

   /**
    *
    */
   animate() {

      // Update sphere position
      let angle = this.clock.elapsedTime() * 0.001;
      this.sphere.position.x = 500 * Math.sin(angle);
      this.sphere.position.z = 500 * Math.cos(angle);

      // Bind function to next frame
      requestAnimationFrame( this.animate );
      // Render ThreeJs Scene
      this.renderScene();
   }

   /**
    *
    */
   renderScene() {
      this.camera.lookAt( this.scene.position );
      this.renderer.render( this.scene, this.camera );
   }

   /**
    *
    */
   createBackground() {
      // create a background
      const backgroundPlane = new THREE.PlaneBufferGeometry(
         window.innerWidth,
         window.innerHeight
      );

      let backgroundMaterial = new THREE.ShaderMaterial({
         uniforms: {
            colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
            colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
         },
         vertexShader: vertex,
         fragmentShader: fragment
      });

      // Create mesh
      const mesh = new THREE.Mesh(backgroundPlane, backgroundMaterial);
      mesh.name = "bg";
      this.scene.add(mesh);

      window.mesh = mesh;
   }

   render() {
      return (
         <div></div>
      )
   }
}
