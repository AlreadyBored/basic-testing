import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} when a=${a}, b=${b} and action=${action}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '=' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '5', b: '3', action: Action.Add })).toBeNull();
  });
});
