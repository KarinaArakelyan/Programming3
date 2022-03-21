let matrix = [];
let n = 20;
let m = 20;


var socket = io();

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

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(10);
}


let side = 20;

function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
                console.log(matrix[y][x]);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                console.log(matrix[y][x]);
            }

            rect(x * side, y * side, side, side);

            /*
            fill("blue")
            text(x+" "+y, x*side+side/2,y*side+side/2)
            */
        }
    }
}
socket.on("send matrix", nkarel);


socket.on('connection', function (socket) {
    nkarel(matrix);
});
                         