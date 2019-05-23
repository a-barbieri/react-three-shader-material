import React, {Component} from 'react'
import * as THREE from 'three'
import {Clock} from './Clock'
import {vertex} from './shaders/background.vert.js'
import {fragment} from './shaders/background.frag.js'

export class Scene extends Component {
   constructor(state) {
      super(state);
      this.animate = this.animate.bind(this);
      this.far = 1000;
   }

   componentDidMount() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(
         -window.innerWidth / 2,
         window.innerWidth / 2,
         -window.innerHeight / 2,
         window.innerHeight / 2,
         1,
         this.far)
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
      this.sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 20, 10 ), material );
      this.sphere.position.z = 20;
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
      this.sphere.position.x = 40 * Math.sin(angle);
      this.sphere.position.y = 40 * Math.cos(angle);


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
         window.innerHeight,
         32
      );

      let backgroundMaterial = new THREE.ShaderMaterial({
         // uniforms: {
         //    u_resolution: {
         //       type: 'vec2',
         //       value: new THREE.Uniform(new THREE.Vector2(100, 200))
         //    },
         //    u_time: {type: 'float', value: 0.0 }
         // },
         vertexShader: vertex,
         fragmentShader: fragment,
         side: THREE.DoubleSide
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
