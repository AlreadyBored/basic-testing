import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 15, b: 5, action: Action.Divide, expected: 3 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 3, action: 'sqrt', expected: null },
  { a: 3, b: 3, action: 'log', expected: null },
  { a: 3, b: 3, action: '%', expected: null },
  { a: '3', b: 2, action: Action.Add, expected: null },
  { a: 3, b: true, action: Action.Add, expected: null },
  { a: 3, b: () => console.log(), action: Action.Add, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`returns ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
