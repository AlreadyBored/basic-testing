// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator - table driven tests', () => {
  test.each([
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 4, b: 3, action: Action.Multiply, expected: 12 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  ])('returns $expected for $a $action $b', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });

  test.each([
    { a: 1, b: 2, action: 'invalid' },
    { a: '1', b: 2, action: Action.Add },
    { a: 1, b: null, action: Action.Multiply },
    { a: {}, b: [], action: Action.Divide },
  ])('returns null for invalid input %#', (input) => {
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
