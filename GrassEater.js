var LivingCreature = require("./LivingCreature");

/////Xotaker

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.directions = [];
        this.energy = 6;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {
        this.getNewCoordinates();
        this.energy--;
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            let newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.x = newX;
            this.y = newY;
        } else {
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.energy >= 12) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;


            let newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 6;
        }
    }

    eat() {
        this.getNewCoordinates();
        let emptyCells = this.chooseCell(1);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell) {
            this.energy++;
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
    }
}