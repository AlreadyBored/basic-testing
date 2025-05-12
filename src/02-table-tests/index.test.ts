// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `Should return $expected when $a $action $b`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'smth' })).toBeNull();
  });

  test('should return null for invalid args', () => {
    expect(
      simpleCalculator({ a: 'smth', b: 2, action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 1, b: 'smth', action: Action.Add }),
    ).toBeNull();
  });
});
