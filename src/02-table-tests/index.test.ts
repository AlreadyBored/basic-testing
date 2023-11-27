import { simpleCalculator, Action } from './index';

type TestCase = {
  a: number;
  b: number | string;
  action: Action;
  expected: number | null;
};

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 11, b: 2, action: Action.Subtract, expected: 9 },
  { a: 45, b: 14, action: Action.Subtract, expected: 31 },
  { a: 92, b: 57, action: Action.Subtract, expected: 35 },
  { a: 7, b: 6, action: Action.Multiply, expected: 42 },
  { a: 19, b: 14, action: Action.Multiply, expected: 266 },
  { a: 9, b: 7, action: Action.Multiply, expected: 63 },
  { a: 51, b: 17, action: Action.Divide, expected: 3 },
  { a: 183, b: 3, action: Action.Divide, expected: 61 },
  { a: 329, b: 7, action: Action.Divide, expected: 47 },
  { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },
  { a: 4, b: 7, action: Action.Exponentiate, expected: 16384 },
  { a: 9, b: 3, action: Action.Exponentiate, expected: 729 },
  { a: 3, b: 5, action: '#' as Action, expected: null },
  { a: 4, b: 7, action: '!' as Action, expected: null },
  { a: 9, b: 3, action: '**' as Action, expected: null },
  { a: 9, b: '5', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly calculate with inputs: %p',
    ({ a, b, action, expected }: TestCase) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
