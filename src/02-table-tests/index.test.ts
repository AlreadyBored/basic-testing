import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: '3', action: Action.Exponentiate, expected: null },
  { a: 2, b: 2, action: 'invalid', expected: null },
];

describe(simpleCalculator.name, () => {
  it.each(testCases)(
    'should correctly calculate $a $action $b to be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
