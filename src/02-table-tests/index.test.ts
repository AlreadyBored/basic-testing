import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 2, b: 5, action: 'invalid action', expected: null },
  { a: 2, b: 'b', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)('$a $action $b should be $expected', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toEqual(expected);
  });
});
