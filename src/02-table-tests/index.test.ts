import { Action, simpleCalculator } from './index';

type TestCase = {
  a: number;
  b: number;
  action: Action;
  expected: number;
};

const testCases: TestCase[] = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Operation %s of %d and %d should be %d',
    ({ action, a, b, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
