import Player from "../player";


// added ispositive property to help with diagonal moves
const directions = {
  UP: { increment: 1, isVertical: true, isPositive: true },
  DOWN: { increment: -1, isVertical: true, isPositive: false },
  RIGHT: { increment: 1, isVertical: false, isPositive: true },
  LEFT: { increment: -1, isVertical: false, isPositive: false },
};

export default class Piece {
  constructor(player) {
    this.player = player;
  }

  static get directions() {
    return directions;
  }

  getAvailableMoves(board) {
    throw new Error(
      "This method must be implemented, and return a list of available moves"
    );
  }

  moveTo(board, newSquare) {
    const currentSquare = board.findPiece(this);
    board.movePiece(currentSquare, newSquare);
  }

  static isOnBoard(arr) {
    return arr.every(x => x >= 0) && arr.every(x => x <= 7)
  }
}
