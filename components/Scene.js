import React, {Component} from 'react'
import * as THREE from 'three'

export class Scene extends Component {

   constructor(state, props) {
      super(state);

   }

   componentDidMount() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight);
      renderer.domElement.id = "scene";

      if (!document.getElementById('scene')) {
         document.body.appendChild( renderer.domElement );
      }
   }

   render() {
      return (
         <h1>THREE</h1>
      )
   }
}