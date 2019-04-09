// import Game from "./src/Game"
// import Tank from "./src/Tank"
// require("babel-core").transform("code", options);
// const Settings = require("./Settings"); 


const Game = require('./src/Game');
const Tank = require("./src/Tank");

const express = require('express');
const app = express();
const path = require(`path`);
const bodyParser = require('body-parser');

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/submit', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/views/form.html'));
// });

// app.get('/game', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/views/index.html'));
// });

// app.get('/tank', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/views/tank.html'));
// });

// app.get('/', (req, res) => {
//   res.send('Hello from App Engine!');
// });

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));




app.post('/submit', (req, res) => {
  console.log({
    name: req.body.name,
    message: req.body.message
  });
  res.send('Thanks for your message!');
});


var io = require('socket.io').listen(server);
var game = new Game();
var numOfUsers = 0;
var interval;

function runGame(game) {

  //console.log("hello"); 
  var isChanged = false;
  
  // console.log(`game ${game}`);
  if (game.tankObjects) {
    // console.log(`game ${game.tankObjects}`);
    for (var i = 0; i < game.tankObjects.length; i++) {
      // for (var j = 0; j < game.tankObjects[i].shots.length; j++) {
      //   var shot = game.tankObjects[i].shots[j];
      //   shot.x += shotSpeed * Math.cos(shot.direction);
      //   shot.y += shotSpeed * Math.sin(shot.direction);

      //   isChanged = true;
      //   if (!checkShotLocation(shot)) {
      //     game.tankObjects[i].shots.splice(j, 1);
      //   }
      // }
    }
  }

  // if state of the game has changed. 
  if (isChanged || game.isChanged) {
    io.emit('gameState', game);
    game.isChanged = false;
  }


}

io.on('connection', function (socket) {

  if (numOfUsers == 0) {
    game.addPlayer(numOfUsers, new Tank(50, 50));
    interval = setInterval(runGame, 1000, game);
  }
  if (numOfUsers == 1) {
    game.addPlayer(numOfUsers, new Tank(150, 50));
  }

  console.log(`You are player ${numOfUsers}`);
  socket.emit('setPlayerNum', numOfUsers);

  numOfUsers++;

  console.log(`a user connected number of Users = ` + numOfUsers);

  socket.on('disconnect', function () {
    numOfUsers = 0;
    clearInterval(interval);
    console.log(`user disconnected number of Users = ` + numOfUsers);
    io.emit('endGame', "endGame");

  });


  socket.on('tank0Actions', function (msg) {
    console.log("recieced message");
    console.log(msg);
    game.playerCommands(0, msg);
    io.emit('gameState', game);
  });

  socket.on('tank1Actions', function (msg) {
    console.log("recieced message");
    console.log(msg);
    game.playerCommands(1, msg);
    io.emit('gameState', game);
  });
});