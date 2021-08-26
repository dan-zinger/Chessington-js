import Piece from "./piece";
import Square from "../square";

export default class Bishop extends Piece {
  constructor(player) {
    super(player);
  }

  getMovesInDirection(board, directions) {
    const location = board.findPiece(this);
    const moves = [];

    let position = Object.entries(location).map(
      ([, coordinate], index) => coordinate + directions[index].increment
    );

    let square = Square.at(...position);

    while (
      Bishop.isOnBoard(square) &&
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

  getAvailableMoves(board) {
    const diagonals = [
      ["UP", "LEFT"],
      ["UP", "RIGHT"],
      ["DOWN", "LEFT"],
      ["DOWN", "RIGHT"],
    ];

    return diagonals
      .map(([verticalDir, horizontalDir]) =>
        this.getMovesInDirection(board, [
          Bishop.directions[verticalDir],
          Bishop.directions[horizontalDir],
        ])
      )
      .flat();
  }
}
