import React, { Component } from "react"; 

class LogIn extends Component {
    
    render() {
        return (
            <form action="/action_page.php">
                Username: <input type="text" name="Username"/><br/>
                Password: <input type="text" name="Password"/><br/>
            <input type="submit" value="Login"/>
            </form>
        )
    }
}

export default LogIn; 
