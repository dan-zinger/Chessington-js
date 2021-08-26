import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Rook extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDirection(board, location, direction) {
    const position = Object.entries(location).map(([, value]) => value);
    const positionIndex = direction.isVertical ? 0 : 1;
    position[positionIndex] += direction.increment;

    let square = Square.at(...position);

    const moves = [];
    while (Rook.isOnBoard(square) && !this.isOccupiedByOwnTeam(board, square)) {
      moves.push(square);
      position[positionIndex] += direction.increment;
      square = Square.at(...position);
    }

    return moves;
  }

  getAvailableMoves(board) {
    const location = board.findPiece(this);

    return Object.entries(Rook.directions)
      .map(([, directionValue]) =>
        this.getMovesInDirection(board, location, directionValue)
      )
      .flat();
  }
}
