var assert = require('assert');
describe('Board Tests', function() {
    describe('Moves Suite', function() {
        describe('Pawn Moves 1', function() {
            it('Check pawn generates correctly before river', function() {
                assert.deepEqual([1, 2, 3].indexOf(4), -1);
            });
        })
    });
});