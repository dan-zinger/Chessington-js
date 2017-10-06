import Piece from './piece';
import Square from "../square";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getMovesInDiagonalDirection(location, verticalDirection, horizontalDirection) {
        const moves = [];
        const position = [location.row + verticalDirection.increment, location.col + horizontalDirection.increment];

        while (Queen.isOnBoard(position)) {
            moves.push(Square.at(...position));
            position[0] += verticalDirection.increment;
            position[1] += horizontalDirection.increment;
        }
        return moves;
    }


    getMovesInAxisDirection(location, direction) {
        const moves = [];

        const position = [location.row, location.col];
        const positionIndex = direction.isVertical ? 0 : 1;
        position[positionIndex] += direction.increment;

        while (position[positionIndex] >= 0 && position[positionIndex] <= 7) {
            moves.push(Square.at(...position));
            position[positionIndex] += direction.increment;
        }
        return moves;
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const diagonals = [['UP', 'LEFT'], ['UP', 'RIGHT'], ['DOWN', 'LEFT'], ['DOWN', 'RIGHT']];

        const availableMoves = Object.entries(Queen.directions)
            .map(directionKeyValuePair => this.getMovesInAxisDirection(location, directionKeyValuePair[1]))
            .flat();

        availableMoves.concat(diagonals.map(diagDir => this.getMovesInDiagonalDirection(location, Queen.directions[diagDir[0]], Queen.directions[diagDir[1]])).flat());7

        return availableMoves
    }

}