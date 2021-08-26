import Piece from "./piece";
import Square from "../square";

export default class Queen extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDiagonalDirection(board, location, directions) {
    let position = Object.entries(location).map(
      ([, coordinate], index) => coordinate + directions[index].increment
    );

    let square = Square.at(...position);
    const moves = [];
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

  getMovesInAxisDirection(board, location, direction) {
    const position = Object.entries(location).map(([, value]) => value);
    const positionIndex = direction.isVertical ? 0 : 1;
    position[positionIndex] += direction.increment;

    let square = Square.at(...position);

    const moves = [];
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
    const location = board.findPiece(this);

    const diagonals = [
      ["UP", "LEFT"],
      ["UP", "RIGHT"],
      ["DOWN", "LEFT"],
      ["DOWN", "RIGHT"],
    ];

    const availableMoves = Object.entries(Queen.directions)
      .map(([, direction]) =>
        this.getMovesInAxisDirection(board, location, direction)
      )
      .flat();

    return availableMoves.concat(
      diagonals
        .map(([vertical, horizontal]) =>
          this.getMovesInDiagonalDirection(board, location, [
            Queen.directions[vertical],
            Queen.directions[horizontal],
          ])
        )
        .flat()
    );
  }
}
