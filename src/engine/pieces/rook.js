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

  getMovesInDirection(board, direction) {
    const location = board.findPiece(this);

    const moves = [];
    const position = [location.row, location.col];
    const positionIndex = direction.isVertical ? 0 : 1;
    position[positionIndex] += direction.increment;
    let square = Square.at(...position)
    
    while (Rook.isOnBoard(square) && !this.isOccupiedByOwn(board, square)) {
      moves.push(square);
      position[positionIndex] += direction.increment;
      square = Square.at(...position)
    }

    return moves;
  }

  getAvailableMoves(board) {
    return Object.entries(Rook.directions)
      .map(directionKeyValuePair =>
        this.getMovesInDirection(board, directionKeyValuePair[1])
      )
      .flat();
  }
}
