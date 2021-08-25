import Piece from './piece';
import Player from "../player";
import Square from "../square";

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getMovesInQuadrant(location, verticalDirection, horizontalDirection) {
        const move1 = [location.row + 2*verticalDirection.increment, location.col + horizontalDirection.increment]
        const move2 = [location.row + verticalDirection.increment, location.col + 2*horizontalDirection.increment]
        
        return [move1, move2].filter(Knight.isOnBoard).map(coordinates => Square.at(...coordinates))
    }

    getAvailableMoves(board) {
        const directionPairs = [['UP', 'LEFT'], ['UP', 'RIGHT'], ['DOWN', 'LEFT'], ['DOWN', 'RIGHT']];
        const location = board.findPiece(this);
        return  directionPairs.map(quadrant => this.getMovesInQuadrant(location, Knight.directions[quadrant[0]], Knight.directions[quadrant[1]])).flat();        
    }
}
