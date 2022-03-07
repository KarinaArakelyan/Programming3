let matrix = [];
let n = 20;
let m = 20;

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

let side = 20;

let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let norKerparArr = [];
let hunterArr = [];

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(10);

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

}

function draw() {
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
    for (let i in grassArr) {
        try { grassArr[i].mul() } catch (err) { continue };
    }
    for (let i in grassEaterArr) {
        try { grassEaterArr[i].eat() } catch (err) { continue };
        try { grassEaterArr[i].mul() } catch (err) { continue };
    }
    for (let i in predatorArr) {
        try { predatorArr[i].eat() } catch (err) { continue };
        try { predatorArr[i].mul() } catch (err) { continue };
    }
    for (let i in norKerparArr) {
        console.log(norKerparArr[i]);
        try { norKerparArr[i].eat() } catch (err) { continue };
        // try { norKerparArr[i].mul() } catch (err) { continue };
    }
    for (let i in hunterArr) {
        try { hunterArr[i].eat() } catch (err) { continue };
        try { hunterArr[i].mul() } catch (err) { continue };
    }
}

