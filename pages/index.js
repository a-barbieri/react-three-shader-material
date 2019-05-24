import React from 'react'
import {Scene} from "../components/Scene";

import apple from '../assets/images/apple.jpeg'

function Home() {
   return (
      <div>
         <img src={apple} />
         <Scene />
      </div>
   )
}

export default Home;