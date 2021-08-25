import Piece from "./piece";
import Square from "../square";

export default class Queen extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDiagonalDirection(
    board,
    verticalDirection,
    horizontalDirection
  ) {
    const location = board.findPiece(this);
    const moves = [];
    const position = [
      location.row + verticalDirection.increment,
      location.col + horizontalDirection.increment,
    ];
    let square = Square.at(...position);

    while (Queen.isOnBoard(square) && !this.isOccupiedByOwn(board, square)) {
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
    while (Queen.isOnBoard(square) && !this.isOccupiedByOwn(board, square)) {
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
      .map(directionKeyValuePair =>
        this.getMovesInAxisDirection(board, directionKeyValuePair[1])
      )
      .flat();

    return availableMoves.concat(
      diagonals
        .map(diagDir =>
          this.getMovesInDiagonalDirection(
            board,
            Queen.directions[diagDir[0]],
            Queen.directions[diagDir[1]]
          )
        )
        .flat()
    );
  }
}
