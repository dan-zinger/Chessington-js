import Player from "../player";

export default class Piece {
  constructor(player) {
    this.player = player;
  }

  static directions = {
    UP: 1,
    DOWN: -1,
    RIGHT: 1,
    LEFT: -1,
  };

  getAvailableMoves(board) {
    throw new Error(
      "This method must be implemented, and return a list of available moves"
    );
  }

  moveTo(board, newSquare) {
    const currentSquare = board.findPiece(this);
    board.movePiece(currentSquare, newSquare);
  }
}
