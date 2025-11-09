import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  // Subtraction
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },

  // Multiplication
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 5, b: 0, action: Action.Multiply, expected: 0 },

  // Division
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 7, b: 2, action: Action.Divide, expected: 3.5 },

  // Exponentiation
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected when a is a number, b is a number, and action is correct',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBeNull();

    expect(
      simpleCalculator({ a: 1, b: null, action: Action.Subtract }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: undefined, b: 2, action: Action.Multiply }),
    ).toBeNull();
  });
});
