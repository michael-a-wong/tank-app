import React, { Component } from "react";
// var React = require('react');
// var Component = React.Component;
import Keys from "./Keys";

// const Keys = require("./Keys"); 
import Tank from "./Client-Tank";
// const Tank = require("./Tank"); 
// import * as Settings from "./Settings"; 

import {socket, Controller} from "./SocketHandler"; 
// const openSocket = require('socket.io-client');
// const socket = openSocket('http://localhost:3000');


const Settings = require("./Settings"); 

// var tankWidth = 25;
// var tankHeight = 10;
// var tankSpeed = 2;
// var tankRotation = Math.PI / 32;
// var tankHealth = 10;

// var shotSpeed = 5;
// var shotRadius = 2;

// probably will have to fix this later
// store variable somewhere
var width; 
var height; 


var flash = 1;

var tankReloadRate = 100; // this is in miliseconds; 


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
    if (tank.x > width - (Settings.tankWidth / 2)) {
        tank.x = width - (Settings.tankWidth / 2);
    }
    if (tank.y > height - (Settings.tankHeight / 2)) {
        tank.y = height - (Settings.tankHeight / 2);
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



class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.controller = new Controller; 
        this.state = {
            tank : new Tank(50, 50)
        }; 
        this.updateAnimationState = this.updateAnimationState.bind(this);
        
        this.socket = this.controller.getSocket(); 
       // console.log(`my socket ${this.socket.emit}`); 

        this.keys = new Keys(this.socket);  
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keys.keyDownHandler, false);
        document.addEventListener("keyup", this.keys.keyUpHandler, false);
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }


    updateAnimationState() {
       this.setState(prevState => {

            let newTank = prevState.tank.copy(); 
            handleKeys(newTank, this.keys.input);  

            return {tank: newTank}; 
            
       });
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.tank);
    }

    render() {
        return <Canvas tank={this.state.tank} />
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.saveContext = this.saveContext.bind(this);
    }

    saveContext(ctx) {
        this.ctx = ctx;
    }

    // drawTank(tank) {
    //     if (tank.health > 0) {


    //         this.ctx.beginPath();

    //         var xTranslation = tank.x + tankWidth / 2;
    //         var yTranslation = tank.y + tankHeight / 2;

    //         this.ctx.translate(xTranslation, yTranslation);
    //         //console.log(tank.direction); 
    //         this.ctx.rotate(tank.direction);
    //         this.ctx.translate(-1 * xTranslation, -1 * yTranslation);

    //         this.ctx.rect(tank.x, tank.y, tankWidth, tankHeight);
    //         this.ctx.fillStyle = "#0095DD";
    //         this.ctx.fill();

    //         this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    //         this.ctx.closePath();

    //         // for (var i = 0; i < tank.shots.length; i++) {

    //         //     if (checkShotLocation(tank.shots[i])) {
    //         //         drawShot(tank.shots[i]);
    //         //         //console.log("true"); 
    //         //     }
    //         //     else {
    //         //         tank.shots.splice(i, 1);
    //         //         //console.log("hello?!?");

    //         //     }
    //         // }
    //     }
    // }

    // this method is being looped, I am treating it like an animation loop
    componentDidUpdate() {
        
        const { tank } = this.props;
        //console.log(tank); 
        width = this.ctx.canvas.width;
        height = this.ctx.canvas.height;

        this.ctx.clearRect(0, 0, width, height);
        this.ctx.save();

        if (tank.health > 0) {


            this.ctx.beginPath();

            var xTranslation = tank.x + Settings.tankWidth / 2;
            var yTranslation = tank.y + Settings.tankHeight / 2;

            this.ctx.translate(xTranslation, yTranslation);


            //console.log(tank.direction); 
            this.ctx.rotate(tank.direction);
            this.ctx.translate(-1 * xTranslation, -1 * yTranslation);

            this.ctx.rect(tank.x, tank.y, Settings.tankWidth, Settings.tankHeight);
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fill();

            this.ctx.setTransform(1, 0, 0, 1, 0, 0);

            this.ctx.closePath();
            this.ctx.restore();

            // for (var i = 0; i < tank.shots.length; i++) {

            //     if (checkShotLocation(tank.shots[i])) {
            //         drawShot(tank.shots[i]);
            //         //console.log("true"); 
            //     }
            //     else {
            //         tank.shots.splice(i, 1);
            //         //console.log("hello?!?");

            //     }
            // }
        }
    }

    render() {
        return <PureCanvas contextRef={this.saveContext}></PureCanvas>;
    }
}

class PureCanvas extends React.Component {
    shouldComponentUpdate() { return false; }

    render() {
        return (
            <canvas width="300" height="300"
                ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
            />
        )
    }
}

export default Animation; 