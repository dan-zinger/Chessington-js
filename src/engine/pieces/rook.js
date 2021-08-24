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

  getRookMovesVertical(location, direction) {
    let moves = [];
    let position = [location.row + direction, location.col];

    while (position[0] >= 0 && position[0] <= 7) {
      moves.push(Square.at(...position));
      position[0] += direction;
    }
    return moves;
  }

  getAvailableMoves(board) {
    let location = board.findPiece(this);
    let availableMoves = [];
    availableMoves += this.getRookMovesVertical(location, directions.UP);
    availableMoves += this.getRookMovesVertical(location, directions.DOWN);
  }
}
