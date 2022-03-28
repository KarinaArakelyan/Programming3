var LivingCreature = require("./LivingCreature");

////Nor kerpar 2

module.exports = class NorKerpar extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
        this.energy = 10;
    }

    getNewCoordinates() {
        this.directions = [
            // [this.x - 1, this.y]
            [this.x + 1, this.y]
            // [this.x, this.y - 1],
            // [this.x, this.y + 1]
        ];
    }

    move() {
        this.getNewCoordinates();
        this.energy++;
        let emptyCells = this.chooseCell(0);
        console.log(emptyCells);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        console.log(newCell);
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x++;
            // this.y = newY;
        }
        else {
            if (this.x == matrix[this.y].length) {
                this.die();
            }
        }
    }
    // mul() {
    //     let emptyCells = this.chooseCell(0);
    //     let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    //     if (newCell && this.energy >= 24) {
    //         let newX = newCell[0];
    //         let newY = newCell[1];
    //         matrix[newY][newX] = 3;

    //         let newnorKerpar = new NorKerpar(newX, newY);
    //         norKerparArr.push(newnorKerpar);
    //         this.energy = 6;
    //     }
    // }

    eat() {
        // this.getNewCoordinates();
        let emptyCells = this.chooseCell(1);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell) {
            // this.energy++;
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            // for (let i in predatorArr && grassEaterArr && grassArr) {
            //     if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
            //         predatorArr.splice(i, 1);
            //         break;
            //     }
            //     if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
            //         grassEaterArr[i].splice(i, 1);
            //         break;
            //     }
            //     if (newX == grassArr[i].x && newY == grassArr[i].y) {
            //         grassArr.splice(i, 1);
            //         break;
            //     }
            // }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in norKerparArr) {
            if (this.x == norKerparArr[i].x && this.y == norKerparArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}