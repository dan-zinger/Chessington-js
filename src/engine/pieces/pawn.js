import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Pawn extends Piece {
  constructor(player) {
    super(player);
    [this.direction, this.startRow] =
      this.player === Player.WHITE
        ? [Pawn.directions.UP, 1]
        : [Pawn.directions.DOWN, 6];
  }

  getAvailableMoves(board) {
    let location = board.findPiece(this);

    const square1 = Square.at(
      location.row + this.direction.increment,
      location.col
    );

    if (this.isOccupiedByOwnTeam(board, square1)) {
      return [];
    }

    if (location.row !== this.startRow) {
      return [square1];
    }

    const square2 = Square.at(
      location.row + 2 * this.direction.increment,
      location.col
    );

    return this.isOccupiedByOwnTeam(board, square2)
      ? [square1]
      : [square1, square2];
  }
}
