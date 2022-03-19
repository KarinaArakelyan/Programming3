var LivingCreature = require("./LivingCreature");

///////Gishatich

module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
        this.energy = 8;
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

            let newPredator = new Predator(newX, newY);
            predatorArr.push(newPredator);
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

        if (newCell && this.energy >= 24) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;

            let newPredator = new Predator(newX, newY);
            predatorArr.push(newPredator);
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

            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }

            }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
