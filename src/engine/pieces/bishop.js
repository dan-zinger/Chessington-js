import Piece from './piece';
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getMovesInDirection(location, verticalDirection, horizontalDirection) {
        const moves = [];
        const position = [location.row + verticalDirection.increment, location.col + horizontalDirection.increment];

        while (Bishop.isOnBoard(position)) {
            moves.push(Square.at(...position));
            position[0] += verticalDirection.increment;
            position[1] += horizontalDirection.increment;
        }
        return moves;
    }

    getAvailableMoves(board) {
        const diagonals = [['UP', 'LEFT'], ['UP', 'RIGHT'], ['DOWN', 'LEFT'], ['DOWN', 'RIGHT']];
        const location = board.findPiece(this);
        return  diagonals.map(diagDir => this.getMovesInDirection(location, Bishop.directions[diagDir[0]], Bishop.directions[diagDir[1]])).flat();
    }
}
