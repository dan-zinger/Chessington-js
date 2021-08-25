import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';



describe("King", () => {
    let board;
    beforeEach(() => (board = new Board()));

    it("can move one in all directions", () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 2), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(3, 3), Square.at(4, 3), Square.at(4, 2), Square.at(4, 1), Square.at(3, 1), Square.at(2, 1), Square.at(2, 2), Square.at(2, 3)]

        moves.should.deep.include.members(expectedMoves);
    });

    it("cannot make any other moves", () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 2), king);

        const moves = king.getAvailableMoves(board);
        moves.should.have.length(8);
    });
})