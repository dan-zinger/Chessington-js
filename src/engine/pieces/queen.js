import Piece from "./piece";
import Square from "../square";

export default class Queen extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDiagonalDirection(board, directions) {
    const location = board.findPiece(this);
    const moves = [];

    let position = Object.entries(location).map(
      ([, coordinate], index) => coordinate + directions[index].increment
    );

    let square = Square.at(...position);

    while (
      Queen.isOnBoard(square) &&
      !this.isOccupiedByOwnTeam(board, square)
    ) {
      moves.push(square);
      position = position.map(
        (coordinate, index) => coordinate + directions[index].increment
      );
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
          this.getMovesInDiagonalDirection(board, [
            Queen.directions[vertical],
            Queen.directions[horizontal],
          ])
        )
        .flat()
    );
  }
}
