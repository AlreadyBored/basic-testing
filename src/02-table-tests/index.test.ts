// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: -2, b: 2, action: Action.Add, expected: 0 },
  { a: 1.2, b: 3.1, action: Action.Add, expected: 4.3 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 10, b: 10, action: Action.Subtract, expected: 0 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: -2, b: -3, action: Action.Multiply, expected: 6 },
  { a: 100, b: 0, action: Action.Multiply, expected: 0 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: -10, b: 2, action: Action.Divide, expected: -5 },
  { a: 1, b: 3, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 0, b: 10, action: Action.Exponentiate, expected: 0 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 2, action: 0, expected: null },
  { a: 1, b: 1, action: 'no action', expected: null },
  { a: 5, b: 2, action: null, expected: null },
  { a: 5, b: 2, action: [], expected: null },
  { a: null, b: null, action: Action.Divide, expected: null },
  { a: 1, b: [], action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)('%o', (t) => {
    expect(
      simpleCalculator({
        a: t.a,
        b: t.b,
        action: t.action,
      }),
    ).toBe(t.expected);
  });
});
