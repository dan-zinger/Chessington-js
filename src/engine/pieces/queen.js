import Piece from "./piece";
import Square from "../square";

export default class Queen extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDiagonalDirection(board, verticalDirection, horizontalDirection) {
    const location = board.findPiece(this);
    const moves = [];

    const position = [
      location.row + verticalDirection.increment,
      location.col + horizontalDirection.increment,
    ];

    let square = Square.at(...position);

    while (
      Queen.isOnBoard(square) &&
      !this.isOccupiedByOwnTeam(board, square)
    ) {
      moves.push(square);
      position[0] += verticalDirection.increment;
      position[1] += horizontalDirection.increment;
      square = Square.at(...position);
    }
    return moves;
  }

  getMovesInAxisDirection(board, direction) {
    const location = board.findPiece(this);
    const moves = [];

    const position = [location.row, location.col];
    const positionIndex = direction.isVertical ? 0 : 1;
    position[positionIndex] += direction.increment;

    let square = Square.at(...position);

    while (
      Queen.isOnBoard(square) &&
      !this.isOccupiedByOwnTeam(board, square)
    ) {
      moves.push(square);
      position[positionIndex] += direction.increment;
      square = Square.at(...position);
    }
    return moves;
  }

  getAvailableMoves(board) {
    const diagonals = [
      ["UP", "LEFT"],
      ["UP", "RIGHT"],
      ["DOWN", "LEFT"],
      ["DOWN", "RIGHT"],
    ];

    const availableMoves = Object.entries(Queen.directions)
      .map(([, value]) => this.getMovesInAxisDirection(board, value))
      .flat();

    return availableMoves.concat(
      diagonals
        .map(([vertical, horizontal]) =>
          this.getMovesInDiagonalDirection(
            board,
            Queen.directions[vertical],
            Queen.directions[horizontal]
          )
        )
        .flat()
    );
  }
}
