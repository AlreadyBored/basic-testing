// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { input: { a: 1, b: 2, action: Action.Add }, expected: 3 },
  { input: { a: 2, b: 2, action: Action.Add }, expected: 4 },
  { input: { a: 3, b: 2, action: Action.Add }, expected: 5 },
  { input: { a: 5, b: 3, action: Action.Subtract }, expected: 2 },
  { input: { a: 4, b: 3, action: Action.Multiply }, expected: 12 },
  { input: { a: 6, b: 3, action: Action.Divide }, expected: 2 },
  { input: { a: 2, b: 3, action: Action.Exponentiate }, expected: 8 },
  { input: { a: 2, b: 3, action: 'invalid' }, expected: null },
  { input: { a: 'not a number', b: 3, action: Action.Add }, expected: null },
  { input: { a: 2, b: 'not a number', action: Action.Add }, expected: null },
  { input: { a: 2, b: 3, action: null }, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should calculates action with a and b',
    ({ input, expected }) => {
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    },
  );
});
