//const Settings = require("./Settings"); 
import Settings from "./Settings";

class Tank {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = 0;
        this.shots = [];
        this.isReloading = false;
        this.health = Settings.tankHealth;
        //this.health = 10;

    }

    copy() {
        //console.log("run copy"); 
        let newTank = new Tank;
        newTank.x = this.x;
        newTank.y = this.y;
        newTank.direction = this.direction;
        newTank.shots = this.shots;
        newTank.isReloading = this.isReloading;
        newTank.health = this.health;
        return newTank;
    };
}

export default Tank; 