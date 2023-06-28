// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 5, action: Action.Add, expected: 10 },
  { a: -15, b: 5, action: Action.Add, expected: -10 },
  { a: 15, b: 5, action: Action.Subtract, expected: 10 },
  { a: 5, b: 15, action: Action.Subtract, expected: -10 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: -5, b: 5, action: Action.Multiply, expected: -25 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: -25, b: 5, action: Action.Divide, expected: -5 },
  { a: 25, b: 5, action: Action.Exponentiate, expected: 9765625 },
  { a: -25, b: 5, action: Action.Exponentiate, expected: -9765625 },
  { a: 25, b: 5, action: '|', expected: null },
  { a: 5, b: 'string', action: Action.Add, expected: null },
  { a: 5, b: null, action: Action.Subtract, expected: null },
  { a: 'string', b: 5, action: Action.Divide, expected: null },
  { a: 'string', b: 'string', action: Action.Multiply, expected: null },
  { a: null, b: null, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'expects $a $action $b to be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
