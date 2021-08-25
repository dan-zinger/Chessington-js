import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Pawn extends Piece {
  constructor(player) {
    super(player);
  }

  moveDirection(board, direction) {}

  getAvailableMoves(board) {
    let location = board.findPiece(this);
    const [direction, startRow] =
      this.player === Player.WHITE
        ? [Pawn.directions.UP, 1]
        : [Pawn.directions.DOWN, 6];

    const square = Square.at(location.row + direction.increment, location.col);
    if (location.row !== startRow && !this.isOccupiedByOwn(board, square)) {
      return [square];
    }

    if (location.row === startRow && !this.isOccupiedByOwn(board, square)) {
      const square2 = Square.at(
        location.row + 2 * direction.increment,
        location.col
      );
      if (!this.isOccupiedByOwn(board, square2)) {
        return [square, square2];
      }

      return [square];
    }

    return [];
  }
}
