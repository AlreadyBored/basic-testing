// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  describe('valid input → correct result', () => {
    it.each([
      { a: 1, b: 2, action: Action.Add, expected: 3 },
      { a: 2, b: 2, action: Action.Add, expected: 4 },
      { a: 3, b: 2, action: Action.Add, expected: 5 },

      { a: 5, b: 3, action: Action.Subtract, expected: 2 },
      { a: -1, b: -1, action: Action.Subtract, expected: 0 },

      { a: 3, b: 4, action: Action.Multiply, expected: 12 },
      { a: 0, b: 5, action: Action.Multiply, expected: 0 },

      { a: 10, b: 2, action: Action.Divide, expected: 5 },
      { a: 1, b: 0, action: Action.Divide, expected: Infinity },

      { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
      { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
    ])('$#. $a $action $b ⇒ $expected', ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });

  describe('invalid input → null', () => {
    test('unknown action returns null', () => {
      const result = simpleCalculator({
        a: 1,
        b: 2,
        action: '%', // not in Action enum
      });
      expect(result).toBeNull();
    });

    it.each([
      { a: '1', b: 2, action: Action.Add },
      { a: 1, b: '2', action: Action.Subtract },
      { a: '1', b: '2', action: Action.Multiply },
    ])('non-numeric args (%o) return null', (input) => {
      expect(simpleCalculator(input)).toBeNull();
    });
  });
});
