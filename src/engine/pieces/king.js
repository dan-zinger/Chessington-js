import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class King extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDiagonalDirection(
    location,
    verticalDirection,
    horizontalDirection
  ) {
    const position = [
      location.row + verticalDirection.increment,
      location.col + horizontalDirection.increment,
    ];
    return King.isOnBoard(position) ? Square.at(...position) : false;
  }

  getMovesInAxisDirection(location, direction) {
    const position = direction.isVertical
      ? [location.row + direction.increment, location.col]
      : [location.row, location.col + direction.increment];
    return King.isOnBoard(position) ? Square.at(...position) : false;
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
      directionKeyValuePair =>
        this.getMovesInAxisDirection(location, directionKeyValuePair[1])
    );

    return availableMoves
      .concat(
        diagonals.map(diagDir =>
          this.getMovesInDiagonalDirection(
            location,
            King.directions[diagDir[0]],
            King.directions[diagDir[1]]
          )
        )
      )
      .filter(x => x);
  }
}
