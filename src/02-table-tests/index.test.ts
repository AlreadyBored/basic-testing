// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 18, b: 2, action: Action.Divide, expected: 9 },
  { a: 28, b: 4, action: Action.Divide, expected: 7 },
  { a: '28', b: 4, action: Action.Divide, expected: null },
  { a: 28, b: 4, action: '&', expected: null },
];

const testCasesNull = [
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 2, b: '2', action: Action.Add, expected: null },
  { a: '3', b: '2', action: Action.Add, expected: null },
  { a: 3, b: 2, action: '&', expected: null },
  { a: '3', b: 2, action: '&', expected: null },
  { a: '3', b: '2', action: '&', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('calculate numbers', ({ a, b, action, expected }) => {
    const input = { a, b, action };
    const result = simpleCalculator(input);
    expect(result).toBe(expected);
  });

  test.each(testCasesNull)(
    'should return null for invalid arguments',
    ({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    },
  );
});
