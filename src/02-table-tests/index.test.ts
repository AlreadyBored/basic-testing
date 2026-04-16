// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 9, b: 3, action: Action.Subtract, expected: 6 },
  { a: 11, b: 3, action: Action.Multiply, expected: 33 },
  { a: 125, b: 5, action: Action.Divide, expected: 25 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 4, b: 3, action: 'Factorization', expected: null },
  { a: {}, b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should $action $a and $b',
    ({ a, b, action, expected }) => {
      const input = { a, b, action };
      expect(simpleCalculator(input)).toBe(expected);
    },
  );
});
