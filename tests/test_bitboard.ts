const BB = require('../src/game/bitboard');

var assert = require('assert');

const one: bigint = BigInt(1); 
const zero: bigint = BigInt(0);

describe('Bitboard', function() {
  describe('Constructor Test 1', function() {
    it('should create empty bitboard', function() {
        let b = new BB.BitBoard(BigInt(0));
        assert.equal(b.getBits(), BigInt(0));
        assert.equal(b.isEmpty(), true);
    });
  });

  describe('Constructor Test 2', function() {
    it('should create a bitboard with a 1 at 2^89', function() {
      let exp = BigInt(89);  
      let b = new BB.BitBoard(one << exp);
      assert.equal(b.getBits(), BigInt(one << exp));
      assert.equal(b.isEmpty(), false);
    });
  });

  describe('Get Set Test 1', function() {
    it('should set bitboard 1 at 2^70', function() {
      let exp = BigInt(70);  
      let b = new BB.BitBoard(BigInt(0));
      b.set(70, 1);
      assert.equal(b.get(70), one);
      assert.equal(b.getBits(), BigInt(one << exp))

      b.set(70, 0);
      assert.equal(b.get(70), zero);

      
    });
  });

  describe('Get Set Test 2', function() {
    it('should set bitboard 1 at 2^71 and 2^70', function() {
      let exp1 = BigInt(71);
      let exp2 = BigInt(70);
         
      let b = new BB.BitBoard(BigInt(0));
      b.set(71, 1);
      assert.equal(b.get(71), one);
      assert.equal(b.getBits(), BigInt(one << exp1))

      b.set(70, 1);
      assert.equal(b.get(70), one);
      assert.equal(b.getBits(), BigInt(one << exp1) + BigInt(one << exp2))
      
    });
  });

  describe('Not Test', function() {
    it('~0 = 2^90 - 1', function() {
      let exp = BigInt(90);
      let b = new BB.BitBoard(zero);
      assert.equal(b.not().getBits(), BigInt((one << exp) - one))
    });
  });

  describe('LSB Test', function() {
    it('2^70 + 2^71 gets the least sig bit at 2^70', function() {
      let b = new BB.BitBoard(zero);
      let b_correct = new BB.BitBoard(zero);
      b.set(70, 1);
      b.set(71, 1);
      b_correct.set(70, 1);
      assert.equal(b.ls1b().isEqual(b_correct), true);
    });
  });

  describe('Single Test', function() {
    it('2^70 + 2^71 is not single, 2^70 is', function() {
      let b = new BB.BitBoard(zero);
      b.set(70, 1);
      assert.equal(b.isSingle(), true);
      b.set(71, 1);
      assert.equal(b.isSingle(), false);
    });
  });

  describe('PopCount Test', function() {
    it('2^90 - 1 gives 90 bits', function() {
      let b = new BB.BitBoard(zero);
      b = b.not();
      assert.equal(b.popCount(), 90);
    });
  });
});