import React, {Component} from 'react'
import * as THREE from 'three'
import {Clock} from './Clock'

export class Scene extends Component {
   constructor(state) {
      super(state);
      this.animate = this.animate.bind(this)
   }

   componentDidMount() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, -window.innerHeight, window.innerHeight, 1, 2000)
      this.camera.position.y = 400;

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(1);
      this.renderer.domElement.id = "scene_test";

      this.initialize();

      if (!document.getElementById('scene_test')) {
         document.body.appendChild( this.renderer.domElement );
      }
   }

   initialize() {

      let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
      this.scene.add( ambientLight );

      let material = new THREE.MeshNormalMaterial();
      this.sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 75, 20, 10 ), material );
      //object.position.set( - 300, 0, 200 );
      this.scene.add( this.sphere );

      this.clock = new Clock();

      this.animate();
   }

   animate() {

      let angle = this.clock.elapsedTime() * 0.001;
      this.sphere.position.x = 500 * Math.sin(angle);
      this.sphere.position.z = 500 * Math.cos(angle);

      requestAnimationFrame( this.animate );
      this.renderScene();
   }

   renderScene() {
      this.camera.lookAt( this.scene.position );
      this.renderer.render( this.scene, this.camera );
   }

   render() {
      return (
         <div></div>
      )
   }
}
