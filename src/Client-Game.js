import Tank from "./Client-Tank";
// const Settings = require("./Settings").default;
// import Settings from "./Settings"; 

class Game {
    constructor() {
        console.log("Made Game!");
        this.numOfPlayers = 0;
        this.tankObjects = new Array(2);
    }
    // addPlayer(playerNum, tank) {
    //     console.log(`player num ${playerNum}, tank ${tank}`); 
    //     console.log(`tank x ${tank.x}`); 
    //   this.tankObjects[playerNum] = tank; 
    //   this.numOfPlayers++; 

    //   // this.tankObject[playerNum] = new Tank(Settings.playerInitPosition[playerNum][0], Settings.playerInitPosition[playerNum][1]); 
    //   // this.numOfPlayers++; 
    // }
    // removePlayer(playerNum) {
    //   this.tankObjects.splice(playerNum, 1); 
    //   this.numOfPlayers--; 
    // }


}

export default Game; 