
// import Tank from "./Tank";
const Tank = require("./Tank"); 
const Settings = require("./Settings"); 

// import * as Settings from "./Settings"; 

function rotateTank(tank, degree) {
    tank.direction = (tank.direction + degree) % (2 * Math.PI);
}

function moveTank(tank, distance) {
    tank.x += distance * Math.cos(tank.direction);
    tank.y += distance * Math.sin(tank.direction);

    if (tank.x < 0) {
        tank.x = 0;
    }
    if (tank.y < 0 + (Settings.tankHeight / 2)) {
        tank.y = 0 + (Settings.tankHeight / 2);
    }
    if (tank.x > Settings.canvasWidth - (Settings.tankWidth / 2)) {
        tank.x = Settings.canvasWidth - (Settings.tankWidth / 2);
    }
    if (tank.y > Settings.canvasHeight - (Settings.tankHeight / 2)) {
        tank.y = Settings.canvasHeight - (Settings.tankHeight / 2);
    }
}


function handleKeys(tank, keys) {
    // The order of the Keys are WKey, SKey, EKey, AKey, DKey, SpaceKey
    //                            0      1     2     3     4       5

    if (keys[0]) {
        moveTank(tank, Settings.tankSpeed);
    }
    if (keys[1]) {
        moveTank(tank, -1 * Settings.tankSpeed)
    }
    if (keys[2] && flash > 0) {
        moveTank(tank, 40);
        flash--;
    }
    if (keys[3]) {
        rotateTank(tank, -1 * Settings.tankRotation)
    }
    if (keys[4]) {
        rotateTank(tank, Settings.tankRotation)
    }
    if (keys[5] && !tank.isReloading) {
        //tank.shots.push(new Shot(tank));
        //tank.isReloading = true;
        //setTimeout(reload, tankReloadRate, tank);
    }
}


 class Game {
    constructor() {
        console.log("Made Game!"); 
      this.numOfPlayers = 0; 
      this.tankObjects = new Array(2); 
    }
    addPlayer(playerNum, tank) {
        console.log(`player num ${playerNum}, tank ${tank}`); 
        console.log(`tank x ${tank.x}`); 
      this.tankObjects[playerNum] = tank; 
      this.numOfPlayers++; 

      // this.tankObject[playerNum] = new Tank(Settings.playerInitPosition[playerNum][0], Settings.playerInitPosition[playerNum][1]); 
      // this.numOfPlayers++; 
    }
    removePlayer(playerNum) {
      this.tankObjects.splice(playerNum, 1); 
      this.numOfPlayers--; 
    }
    playerCommands(playerNum, keys) {
  
      var opponent = 0; 
      if (playerNum == 0) {
        opponent = 1; 
      }

      console.log(`tank object ${this.tankObjects[0]}`); 
      console.log(`player num ${playerNum}`); 
  
      handleKeys(this.tankObjects[playerNum], keys)
      //tankObjects[playerNum].checkIfHit(this.tankObjects[opponent]); 
  
      // might have to delete line below
      //tankObjects[opponent].checkIfHit(this.tankObjects[playerNum]); 
  
  
    }
    
  }
  

  module.exports = Game;  