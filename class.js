class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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

    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.multiply >= 8) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;

            let newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}

/////Xotaker
class GrassEater extends LivingCreature {
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
///////Gishatich

class Predator extends LivingCreature {
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
////Nor kerpar 1

class Hunter extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
        this.energy = 10;
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

            let newHunter = new Hunter(newX, newY);
            hunterArr.push(newHunter);
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

        if (newCell && this.energy >= 26) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;

            let newHunter = new Hunter(newX, newY);
            hunterArr.push(newHunter);
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
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}
////Nor kerpar 2

class NorKerpar extends LivingCreature {
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

            for (let i in predatorArr && grassEaterArr && grassArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
                if (newX == grassEaterArr[i].x && newY == grassEater[i].y) {
                    grassEaterArr[i].splice(i, 1);
                    break;
                }
                if (newX == grassArr[i].x && newY == grass[i].y) {
                    grassEaterArr[i].splice(i, 1);
                    break;
                }
            }
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