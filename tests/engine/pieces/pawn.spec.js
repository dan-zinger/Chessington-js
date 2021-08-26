import "chai/register-should";
import Pawn from "../../../src/engine/pieces/pawn";
import Board from "../../../src/engine/board";
import Player from "../../../src/engine/player";
import Square from "../../../src/engine/square";

describe("Pawn", () => {
  describe("white pawns", () => {
    let board;
    beforeEach(() => (board = new Board()));

    it("can only move one square up if they have already moved", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(2, 0), pawn); // It looks like this starting position is actuall yif it HASN't moved!

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(1);
      moves.should.deep.include(Square.at(3, 0)); //
    });

    it("cannot move up if position in front occupied by own piece", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(1, 1), pawn);

      const pawnOther = new Pawn(Player.WHITE);
      board.setPiece(Square.at(2, 1), pawnOther);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(0);
    });

    it("can only move up one position if position two spaces in front is occupied by own", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(1, 1), pawn);

      const pawnOther = new Pawn(Player.WHITE);
      board.setPiece(Square.at(3, 1), pawnOther);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(1);
    });

    it("can move one or two squares up on their first move", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(1, 7), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(2);
      moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
    });
  });

  describe("black pawns", () => {
    let board;
    beforeEach(() => (board = new Board(Player.BLACK)));

    it("can only move one square down if they have already moved", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(6, 0), pawn);
      pawn.moveTo(board, Square.at(5, 0));

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(1);
      moves.should.deep.include(Square.at(4, 0));
    });

    it("can move one or two squares down on their first move", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(6, 7), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(2);
      moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
    });

    it("cannot move down if position in front occupied by own piece", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(6, 1), pawn);

      const pawnOther = new Pawn(Player.BLACK);
      board.setPiece(Square.at(5, 1), pawnOther);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(0);
    });

    it("can only move down one position if position two spaces in front is occupied by own", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(1, 1), pawn);

      const pawnOther = new Pawn(Player.BLACK);
      board.setPiece(Square.at(3, 1), pawnOther);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(1);
    });
  });
});
