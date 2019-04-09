// import * as Settings from "./Settings"; 

//import Settings from "./Settings"; 

const Settings = require("./Settings"); 


function getLengthForDeg(phi) {
    phi = ((phi + 45) % 90 - 45) / 180 * Math.PI;
    return 1 / Math.cos(phi);
}

class Tank {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = 0;
        this.shots = [];
        this.isReloading = false;
        this.health = Settings.tankHealth;

    }

    

    update(object) {
        this.x = object.x;
        this.y = object.y;
        this.direction = object.direction;
        this.shots = object.shots;
        this.isReloading = object.isReloading;
        this.health = object.health;
    }

    checkIfHit(tank) {
        for (var i = 0; i < tank.shots.length; i++) {

            for (var orbitDegree = 0; orbitDegree < Math.PI * 2; orbitDegree += Math.PI / 32) {
                var length = getLengthForDeg(orbitDegree * (180 / Math.PI));

                var movingLengthX = (Settings.tankWidth + Settings.tankHeight) / 2 + ((Settings.tankWidth - Settings.tankHeight) / 2 * Math.cos(2 * this.direction));
                var movingLengthY = (Settings.tankWidth + Settings.tankHeight) / 2 + ((Settings.tankWidth - Settings.tankHeight) / -2 * Math.cos(2 * this.direction));

                var testx = this.x + (Settings.tankWidth / 2) + (movingLengthX / 2 * length * Math.cos(orbitDegree));
                var testy = this.y + (Settings.tankHeight / 2) + (movingLengthY / 2 * length * Math.sin(orbitDegree));

                var distanceToShot = Math.sqrt(Math.pow((testx - tank.shots[i].x), 2) + Math.pow((testy - tank.shots[i].y), 2));


                if (distanceToShot < Settings.shotRadius) {
                    console.log("I got hit!!!");
                    tank.shots.splice(i, 1);
                    this.health--;

                    // if (this.health == 0) {
                    //     explosion(this);
                    // }

                    // if only one shot can hit at a time
                    break;
                }

            }
        }
    }
}


module.exports = Tank; 

