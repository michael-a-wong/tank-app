
//const io = require('./socket.io'); 

// this is the refresh rate for keys in (milliseconds)
var keyRateTime = 15;  

// import openSocket from 'socket.io-client';
// const openSocket = require('socket.io-client');
// const socket = openSocket('http://localhost:3000');

// var socket = io();

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

class Keys {
    constructor(socket) {

        // The order of the Keys are WKey, SKey, EKey, AKey, DKey, SpaceKey
        //                            0      1     2     3     4       5
        // input keeps track of what has been inputed
        this.input = new Array(6); 
        this.input.fill(0); 

        // if you hold down a key, this monitors the rate at with you can click
        this.keyRateArray = new Array(6);
        this.keyRateArray.fill(1);

        this.keyRate = this.keyRate.bind(this); 
        this.keyDownHandler = this.keyDownHandler.bind(this); 
        this.keyUpHandler = this.keyUpHandler.bind(this); 
        this.socket = socket; 
    }

    keyRate(index) {
        //console.log("Hello?")
        this.keyRateArray[index] = 1;
    }

    // in the future can change it to bit malipulation 
    keyDownHandler(e) {
        

        // The order of the Keys are WKey, SKey, EKey, AKey, DKey, SpaceKey
        //                            0      1     2     3     4       5
        if (e.key == "w" && this.keyRateArray[0]) {
            this.input[0] = 1;
            this.keyRateArray[0] = 0;
            setTimeout(this.keyRate, keyRateTime, 0);

        }
        if (e.key == "s" && this.keyRateArray[1]) {
            this.input[1] = 1;
            this.keyRateArray[1] = 0;
            setTimeout(this.keyRate, keyRateTime, 1);
        }
        if (e.key == 'e' && this.keyRateArray[2]) {
            this.input[2] = 1;
            this.keyRateArray[2] = 0;
            setTimeout(this.keyRate, keyRateTime, 2);
        }
        if (e.key == "a" && this.keyRateArray[3]) {
            this.input[3] = 1;
            this.keyRateArray[3] = 0;
            setTimeout(this.keyRate, keyRateTime, 3);
        }
        if (e.key == "d" && this.keyRateArray[4]) {
            this.input[4] = 1;
            this.keyRateArray[4] = 0;
            setTimeout(this.keyRate, keyRateTime, 4);
        }
        if (e.key == ' ' && this.keyRateArray[5]) {
            this.input[5] = 1;
            this.keyRateArray[5] = 0;
            setTimeout(this.keyRate, keyRateTime, 5);
        }

        if (!arraysEqual(this.keyRateArray, [0, 0, 0, 0, 0, 0])) {
            //console.log("sending ", this.input); 
            // socket.emit(`tank${playerNum}Actions`, keys);

            this.socket.emit(`tank0Actions`, this.input);

        }
    }


    keyUpHandler(e) {
        // The order of the Keys are WKey, SKey, EKey, AKey, DKey, SpaceKey
        //                            0      1     2     3     4       5
        if (e.key == "w") {
            this.input[0] = 0;
        }
        if (e.key == "s") {
            this.input[1] = 0;
        }
        if (e.key == 'e') {
            this.input[2] = 0;
        }
        if (e.key == "a") {
            this.input[3] = 0;
        }
        if (e.key == "d") {
            this.input[4] = 0;
        }
        if (e.key == ' ') {
            this.input[5] = 0;
        }

    }

}

export default Keys; 

// module.exports = Keys; 