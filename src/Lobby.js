import React, { Component } from "react"; 

class Lobby extends Component {
    render() {
        return (
            <div>
                <div>  
                    <h2>Lobby</h2>
                    <p>Choose a person you want to battle!</p>
                </div>
                <div>
                    <ul>
                        <li>Player 1</li>
                        <li>Player 2</li>
                        <li>Player 3</li>
                    </ul>
                </div>
                <button type="button">Battle</button>
            </div>
        ); 
    }
}
            
export default Lobby; 
