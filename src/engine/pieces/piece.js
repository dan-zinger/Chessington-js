import Player from "../player";

const directions = {
  UP: { increment: 1, isVertical: true },
  DOWN: { increment: -1, isVertical: true },
  RIGHT: { increment: 1, isVertical: false },
  LEFT: { increment: -1, isVertical: false },
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

  static isOnBoard(square) {
    return Object.values(square).every(x => x >= 0 && x <= 7);
  }

  isOccupiedByOwnTeam(board, square) {
    const piece = board.getPiece(square);
    return typeof piece !== "undefined" && piece.player === this.player;
  }
}
