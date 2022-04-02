var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(5050);

// weather = ["spring", "summer", 'winter', 'autumn'];

// function weath(){
//     for(i in weather){

//         if (weather[i] == "winter"){
//             weather[i] = "spring";
//         } else if (weather[i] == "spring"){
//             weather[i] = "summer";
//         } else if (weather[i] == "summer"){
//             weather[i] = "autumn";
//         } else if (weather[i] == "autumn"){
//             weather[i] = "winter";
//         }

//     }
//     io.sockets.emit('send matrix', matrix)
// }
// io.sockets.emit("weather", weather)
// setInterval(weath, 5000);

//matrix
n = 20;
m = 20;
matrix = [];


function matrixgenerate() {
    for (let y = 0; y < n; y++) {
        matrix[y] = [];
        for (let x = 0; x < m; x++) {
            let k = Math.floor(Math.random() * 100);
            if (k >= 0 && k < 70) {
                matrix[y][x] = 1;
            } else if (k >= 83 && k < 86) {
                matrix[y][x] = 2;
            } else if (k >= 90 && k < 93) {
                matrix[y][x] = 3;
            } else if (k >= 93 && k < 94) {
                matrix[y][x] = 4;
            } else if (k >= 86 && k < 89) {
                matrix[y][x] = 5;
            }
        }
    }
}

io.sockets.emit('send matrix', matrix);

side = 20;
grassArr = [];
grassEaterArr = [];
predatorArr = [];
norKerparArr = [];
hunterArr = [];


// let LivingCreature = require("./LivingCreature");
Grass = require("./Grass");
GrassEater = require("./GrassEater");
Hunter = require("./Hunter");
Predator = require("./Predator");
NorKerpar = require("./NorKerpar2");


function createObject() {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y);
                grassEaterArr.push(gr);
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y);
                predatorArr.push(gr);
            } else if (matrix[y][x] == 4) {
                let gr = new NorKerpar(x, y);
                norKerparArr.push(gr);
            } else if (matrix[y][x] == 5) {
                let gr = new Hunter(x, y);
                hunterArr.push(gr);
            }
        }
    }

    io.sockets.emit('send matrix', matrix);
}


function game() {
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
    }
    for (let i in predatorArr) {
        predatorArr[i].eat();
        predatorArr[i].mul();
    };

    for (let i in norKerparArr) {
        norKerparArr[i].eat();
        // console.log(norKerparArr[i]);
        // try { norKerparArr[i].mul() } catch (err) { continue };
    }
    for (let i in hunterArr) {
        hunterArr[i].eat();
        hunterArr[i].mul();
    }

    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000);

io.on('connection', function (socket) {
    createObject();
    matrixgenerate()
});

function kill() {
    grassArr = [];
    grassEaterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            PredatorArr.push(new Predator(x, y));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addNewKerpar() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            NewKerparArr.push(new NewKerpar(x, y));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addHunter() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            HunterArr.push(new Hunter(x, y));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add Predator", addPredator);
    socket.on("add NewKerpar", addNewKerpar);
    socket.on("add Hunter", addHunter);
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.NewKerpar = norKerparArr.length;
    statistics.Hunter = hunterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send");
    })
}, 1000)