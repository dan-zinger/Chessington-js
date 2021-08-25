import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Rook extends Piece {
  constructor(player) {
    super(player);
  }

  //   getRookMovesOld(board, location, direction) {
  //     let moves = [];
  //     let position = [location.row, location.col]
  //     while (true) {
  //         position[0] += direction.up
  //         let square = Square.at(...position)
  //         let squareContents = board.getPiece(square)
  //         if (!squareContents) {
  //             break;
  //         } else if (this.player === squareContents.player) {

  //         }
  //     }

  //     return moves
  //   }

  getMovesInDirection(location, direction) {
    const moves = [];

    const position = [location.row, location.col];
    const positionIndex = direction.isVertical ? 0 : 1;
    position[positionIndex] += direction.increment;

    while (position[positionIndex] >= 0 && position[positionIndex] <= 7) {
      moves.push(Square.at(...position));
      position[positionIndex] += direction.increment;
    }
    return moves;
  }


  getAvailableMoves(board) {
    let location = board.findPiece(this);
    let availableMoves = [];
    for (const dir in Rook.directions) {
      availableMoves = availableMoves.concat(
        this.getMovesInDirection(location, Rook.directions[dir])
      );
    }

    return availableMoves;
  }
}
