import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class King extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDiagonalDirection(board, location, directions) {
    const position = Object.entries(location).map(
      ([, coordinate], index) => coordinate + directions[index].increment
    );

    const square = Square.at(...position);

    return King.isOnBoard(square) && !this.isOccupiedByOwnTeam(board, square)
      ? square
      : false;
  }

  getMovesInAxisDirection(board, location, direction) {
    const position = direction.isVertical
      ? [location.row + direction.increment, location.col]
      : [location.row, location.col + direction.increment];

    const square = Square.at(...position);

    return King.isOnBoard(square) && !this.isOccupiedByOwnTeam(board, square)
      ? square
      : false;
  }

  getAvailableMoves(board) {
    const location = board.findPiece(this);

    const diagonals = [
      ["UP", "LEFT"],
      ["UP", "RIGHT"],
      ["DOWN", "LEFT"],
      ["DOWN", "RIGHT"],
    ];

    const availableMoves = Object.entries(King.directions).map(
      ([, direction]) =>
        this.getMovesInAxisDirection(board, location, direction)
    );

    return availableMoves
      .concat(
        diagonals.map(([vertical, horizontal]) =>
          this.getMovesInDiagonalDirection(board, location, [
            King.directions[vertical],
            King.directions[horizontal],
          ])
        )
      )
      .filter(x => x);
  }
}
