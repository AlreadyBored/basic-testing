import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 4, action: Action.Subtract, expected: 0 },
  { a: 5, b: 4, action: Action.Multiply, expected: 20 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 6, action: Action.Exponentiate, expected: 64 },
  { a: 2, b: 6, action: '@', expected: null },
  { a: '$', b: 6, action: Action.Multiply, expected: null },
  { a: 2, b: '#', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should check $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
