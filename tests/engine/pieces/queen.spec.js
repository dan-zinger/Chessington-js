import "chai/register-should";
import Queen from "../../../src/engine/pieces/queen";
import Board from "../../../src/engine/board";
import Player from "../../../src/engine/player";
import Square from "../../../src/engine/square";

describe("Queen", () => {
  let board;
  beforeEach(() => (board = new Board()));

  it("can move laterally and diagonally", () => {
    const queen = new Queen(Player.WHITE);
    board.setPiece(Square.at(1, 2), queen);

    const moves = queen.getAvailableMoves(board);

    const expectedMoves = [
      // Horizontal
      Square.at(1, 0),
      Square.at(1, 1),
      Square.at(1, 3),
      Square.at(1, 4),
      Square.at(1, 5),
      Square.at(1, 6),
      Square.at(1, 7),
      // Vertical
      Square.at(0, 2),
      Square.at(2, 2),
      Square.at(3, 2),
      Square.at(4, 2),
      Square.at(5, 2),
      Square.at(6, 2),
      Square.at(7, 2),
      // Up-Left Diagonal
      Square.at(0, 1),
      // Up-Right Diagonal
      Square.at(2, 1),
      Square.at(3, 0),
      // Down-Right Diagonal
      Square.at(2, 3),
      Square.at(3, 4),
      Square.at(4, 5),
      Square.at(5, 6),
      Square.at(6, 7),
      // Down-Left Diagonal
      Square.at(0, 3),
    ];

    moves.should.deep.include.members(expectedMoves);
  });

  it("cannot make any other moves", () => {
    const queen = new Queen(Player.WHITE);
    board.setPiece(Square.at(1, 2), queen);

    const moves = queen.getAvailableMoves(board);

    moves.should.have.length(23);
  });
});
