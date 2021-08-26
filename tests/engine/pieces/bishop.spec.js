import Bishop from "../../../src/engine/pieces/bishop";
import "chai/register-should";
import Board from "../../../src/engine/board";
import Player from "../../../src/engine/player";
import Square from "../../../src/engine/square";
import Pawn from "../../../src/engine/square";

describe("Bishop", () => {
  let board;
  beforeEach(() => (board = new Board()));

  it("can move diagonally", () => {
    const bishop = new Bishop(Player.WHITE);
    board.setPiece(Square.at(3, 2), bishop);

    const moves = bishop.getAvailableMoves(board);

    const expectedMoves = [
      // Right-Up diagonal
      Square.at(4, 3),
      Square.at(5, 4),
      Square.at(6, 5),
      Square.at(7, 6),
      // Left-Up diagonal
      Square.at(2, 3),
      Square.at(1, 4),
      Square.at(0, 5),
      // Right-Down diagonal
      Square.at(4, 1),
      Square.at(5, 0),
      // Left-Down Diagonal
      Square.at(2, 1),
      Square.at(1, 0),
    ];

    moves.should.deep.include.members(expectedMoves);
  });

  it("cannot make any other moves", () => {
    const bishop = new Bishop(Player.WHITE);
    board.setPiece(Square.at(3, 2), bishop);

    const moves = bishop.getAvailableMoves(board);
    moves.should.have.length(11);
  });

  it("cannot move onto or past square occupied by own piece", () => {
    const bishop = new Bishop(Player.WHITE);
    board.setPiece(Square.at(3, 2), bishop);
    
    const pawn1 = new Pawn(Player.WHITE);
    board.setPiece(Square.at(5,4), pawn1);

    const pawn2 = new Pawn(Player.WHITE);
    board.setPiece(Square.at(1,4), pawn2);

    const moves = bishop.getAvailableMoves(board);
    moves.should.have.length(6);
  });
});
