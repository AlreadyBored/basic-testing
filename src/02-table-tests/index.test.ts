import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 5, action: Action.Add, expected: 6 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly calculate each test case',
    ({ expected, ...rest }) => {
      const result = simpleCalculator(rest);

      expect(result).toBe(expected);
    },
  );
});
