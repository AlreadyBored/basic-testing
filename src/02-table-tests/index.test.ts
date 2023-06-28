// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 3, action: 'create', expected: null },
  { a: 'five', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should $action two numbers',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
