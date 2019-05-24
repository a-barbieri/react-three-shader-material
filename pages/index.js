import React, {Component} from 'react'
import { MainScene } from "../three/MainScene";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0
    }

  }
  componentDidMount() {
    MainScene.init();
    this.triggerRender()
  }

  triggerRender() {
    setInterval(()=>{
      this.setState({counter: this.state.counter+1 });
    }, 1000)
  }

  render(){
    return (
      <div id="main">
        Hello World! #{this.state.counter}
      </div>
    )
  }
}

export default Home;
