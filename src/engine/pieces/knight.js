import Piece from "./piece";
import Player from "../player";
import Square from "../square";

export default class Knight extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInQuadrant(board, location, verticalDirection, horizontalDirection) {
    const move1 = Square.at(
      location.row + 2 * verticalDirection.increment,
      location.col + horizontalDirection.increment
    );
    const move2 = Square.at(
      location.row + verticalDirection.increment,
      location.col + 2 * horizontalDirection.increment
    );

    return [move1, move2].filter(
      square =>
        Knight.isOnBoard(square) && !this.isOccupiedByOwnTeam(board, square)
    );
  }

  getAvailableMoves(board) {
    const location = board.findPiece(this);

    const directionPairs = [
      ["UP", "LEFT"],
      ["UP", "RIGHT"],
      ["DOWN", "LEFT"],
      ["DOWN", "RIGHT"],
    ];

    return directionPairs
      .map(([vertical, horizontal]) =>
        this.getMovesInQuadrant(
          board,
          location,
          Knight.directions[vertical],
          Knight.directions[horizontal]
        )
      )
      .flat();
  }
}
