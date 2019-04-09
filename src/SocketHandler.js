
import Game from "./Client-Game";

const openSocket = require('socket.io-client');
const socket = openSocket('http://localhost:3000');

var previousGameState;
var numOfSections = 2;



class Controller {
    constructor() {
        this.game = new Game();
        this.socket = socket;


        this.socket.on('setPlayerNum', function (msg) {

            //let playerNum = msg;
            console.log("I am player " + msg);
            // if (playerNum == 1) {
            //     meTank = new Tank(40, 40);
            //     enemyTank = new Tank(150, 40);

            // }
            // else if (playerNum == 2) {
            //     meTank = new Tank(150, 40);
            //     enemyTank = new Tank(40, 40);
            // }

            // tankQueue.push([meTank, enemyTank]);

            // draw();

        });



        this.socket.on('gameState', function (msg) {



            console.log(msg);

            /*
           if (previousGameState && previousGameState[0] && previousGameState[1]) {
               // calculate Δ State
       
               // for (var i = 0; i < msg.tankObjects.shots.length; i++) {
               //     var tank0x = (msg.tankObjects[i].x - previousGameState.tankObjects[i].x ) / numOfSections;
               //     var tank0y = (msg.tankObjects[i].y - previousGameState.tankObjects[i].y ) / numOfSections;
               // }
       
               if (tankQueue.length < 15) {
       
       
                   var px0 = previousGameState[0].x
                   var py0 = previousGameState[0].y
                   var px1 = previousGameState[1].x
                   var py1 = previousGameState[1].y
                   var pd0 = previousGameState[0].direction;
                   var pd1 = previousGameState[1].direction;
       
       
       
                   var dxtank0 = (msg.tankObjects[0].x - px0) / numOfSections;
                   var dytank0 = (msg.tankObjects[0].y - py0) / numOfSections;
                   var dxtank1 = (msg.tankObjects[1].x - px1) / numOfSections;
                   var dytank1 = (msg.tankObjects[1].y - py1) / numOfSections;
                   var dd0 = (msg.tankObjects[0].direction - pd0) / numOfSections;
                   var dd1 = (msg.tankObjects[1].direction - pd1) / numOfSections;
       
                   for (var i = 0; i < numOfSections; i++) {
       
       
                       var temptank0 = new Tank(px0 + (dxtank0 * i), py0 + (dytank0 * i));
                       temptank0.direction = pd0 + (dd0 * i);
                       temptank0.shots = msg.tankObjects[0].shots;
       
                       var temptank1 = new Tank(px1 + (dxtank1 * i), py1 + (dytank1 * i));
                       temptank1.direction = pd1 + (dd1 * i);
                       temptank1.shots = msg.tankObjects[1].shots;
       
                       //console.log("hello" + [temptank0, temptank1]);
                       tankQueue.push([temptank0, temptank1]);
                   }
               }
               else {
                   tankQueue.push(msg.tankObjects);
               }
       
           }
           else {
               tankQueue.push(msg.tankObjects);
       
           }
       
           previousGameState = msg.tankObjects;
       
           */
        });
    }
    getGameState() {

    }
    getSocket() {
        return this.socket;
    }
}

export { socket, Controller }; 