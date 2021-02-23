const BB = require('../src/game/bitboard');

var assert = require('assert');
describe('Bitboard', function() {
  describe('Constructor Test 1', function() {
    it('should create empty bitboard', function() {
        let b = new BB.BitBoard(BigInt(0));
        assert.equal(b.getBits(), BigInt(0));

        assert.equal(b.isEmpty(), true);

        
    });
  });
});