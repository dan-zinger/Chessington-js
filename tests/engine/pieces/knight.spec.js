import 'chai/register-should';
import Knight from '../../../src/engine/pieces/knight';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from "../../../src/engine/pieces/pawn";

describe('Knight', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move all 8 expected moves', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);

        const moves = knight.getAvailableMoves(board);

        const expectedMoves = [
            // x == 2
            Square.at(2, 3), Square.at(2, 5),
            // x == 3
            Square.at(3, 2), Square.at(3, 6),
            // x = 5
            Square.at(5, 2), Square.at(5, 6),
            // x = 6
            Square.at(6, 3), Square.at(6, 5)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(3, 2), knight);

        const moves = knight.getAvailableMoves(board);
        moves.should.have.length(8);
    });

    it('cannot move onto square occupied by own piece', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);

        const pawn1 = new Pawn(Player.WHITE);
        board.setPiece(Square.at(2, 5), pawn1);

        const pawn2 = new Pawn(Player.WHITE);
        board.setPiece(Square.at(3, 6), pawn2);

        const pawn3 = new Pawn(Player.WHITE);
        board.setPiece(Square.at(5, 6), pawn3);

        const pawn4 = new Pawn(Player.WHITE);
        board.setPiece(Square.at(6, 5), pawn4);

        const moves = knight.getAvailableMoves(board);

        moves.should.have.length(4);
    });

});
