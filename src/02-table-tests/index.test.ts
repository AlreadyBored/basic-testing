// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const validInputCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: -2, action: Action.Add, expected: 1 },
  { a: 3, b: -7, action: Action.Add, expected: -4 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: -2, action: Action.Subtract, expected: 5 },
  { a: 3, b: -7, action: Action.Subtract, expected: 10 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: -2, action: Action.Multiply, expected: -6 },
  { a: 3, b: -7, action: Action.Multiply, expected: -21 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: -2, action: Action.Divide, expected: -1.5 },
  { a: 3, b: -7, action: Action.Divide, expected: -0.429 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: -2, action: Action.Exponentiate, expected: 0.111 },
  { a: 1, b: 2, action: 'add', expected: null },
  { a: 1, b: 2, action: undefined, expected: null },
  { a: 1, b: '2', action: Action.Add, expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 'one', b: 'two', action: Action.Add, expected: null },
  { a: undefined, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(validInputCases)(
    '$a $action $b -> $expected',
    ({ expected, ...input }) => {
      if (expected === null) {
        expect(simpleCalculator(input)).toBeNull();
      } else {
        expect(simpleCalculator(input)).toBeCloseTo(expected);
      }
    },
  );
});
