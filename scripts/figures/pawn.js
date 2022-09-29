import Figure from './figure.js';

export default class Pawn extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    move(matrix, clickedCoordinates) {
        var possibleMoves = this.getPossibleMoves(matrix);
        var canMove;
        let clickedX = clickedCoordinates.x;
        let clickedY = clickedCoordinates.y;

        for (let i = 0; i < possibleMoves.length; i++) {
            if(possibleMoves[i].x === clickedX && possibleMoves[i].y === clickedY) {
                canMove = true;
                this.renderPosition(matrix, clickedCoordinates)
            }
        }
        return canMove;
    }

    isFirstMove() {
        return this.initialX === this.currentX && this.initialY === this.currentY;
    }

    getPossibleMoves(matrix) {
        let moves = [];

        let whiteMoves = [{x: -2,y: 0},{x: -1,y: 0},{x: -1,y: -1},{x: -1,y: +1}];
        let blackMoves = [{x: +2,y: 0},{x: +1,y: 0},{x: +1,y: +1},{x: +1,y: -1}];

        let figureAllMoves = this.color === 'white' ? whiteMoves : blackMoves;
        let indexChecker = this.color === 'white' ? -1 : +1;

        // If is the first move of the pawn
        if(this.isFirstMove() && matrix[this.currentX+indexChecker][this.currentY] === null) {
            moves.push({x: figureAllMoves[0].x,y: figureAllMoves[0].y});
        }

        // IF there is a figure in front of the pawn
        if(matrix[this.currentX+indexChecker][this.currentY] === null) {
            moves.push({x: figureAllMoves[1].x,y: figureAllMoves[1].y});
        }

        moves.push({x: figureAllMoves[2].x,y: figureAllMoves[2].y});
        moves.push({x: figureAllMoves[3].x,y: figureAllMoves[3].y});

        return this.calculateCoordinatesFromOrigin(matrix,moves);
    }

    calculateCoordinatesFromOrigin(matrix,coordinates) {
        let validCoordinates = [];

        for (let i = 0; i < coordinates.length; i++) {
            let x = this.currentX + coordinates[i].x;
            let y = this.currentY + coordinates[i].y;

            /*  
                1. Checking if the move is beyond the boundaries of the board
                2. Checking if the pawn can take other figure
                3. Else the move is valid
            */
            if(x < 0 || y < 0) {
                continue;
            } else if(this.currentY !== y){
                if(matrix[x][y]) {
                    validCoordinates.push({x: x, y: y});
                }
            } else {
                validCoordinates.push({x: x, y: y});
            }
        }

        return validCoordinates;
    }

    renderPosition(matrix, coordinates) {
        // Matrix handling
        matrix[this.currentX][this.currentY] = null;
        matrix[coordinates.x][coordinates.y] = this;
    }
}