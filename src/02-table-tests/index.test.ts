import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 1, action: Action.Add, expected: 3 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 2, b: 1, action: Action.Multiply, expected: 2 },
  { a: 2, b: 1, action: 'zhepa', expected: null },
  { a: 'zhepa', b: undefined, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('%#: "%s"', ({ expected, ...params }) =>
    expect(simpleCalculator(params)).toEqual(expected),
  );
});
