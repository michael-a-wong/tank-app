import React, { Component } from "react";
import App from "./App";  

class HowToPlay extends Component {
  render() {
    return (
      <div>
        <div> 
            <img src="./images/awsd.png"  />
            <App></App>
            <img src="./images/space.jpeg" />
        </div>
        <button type="button">Practice</button>
      </div>
    );
  }
}
 
export default HowToPlay;
