// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: 30, b: 6, action: Action.Divide, expected: 5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 5, b: 4, action: Action.Exponentiate, expected: 625 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 10, b: 4, action: Action.Multiply, expected: 40 },
  { a: 7, b: 3, action: Action.Multiply, expected: 21 },
  { a: 8, b: 8, action: Action.Multiply, expected: 64 },
  { a: 11, b: 7, action: Action.Subtract, expected: 4 },
  { a: 8, b: 5, action: Action.Subtract, expected: 3 },
  { a: 14, b: 5, action: Action.Subtract, expected: 9 },
  { a: 14, b: 5, action: 'invalid', expected: null },
  { a: '14', b: 5, action: Action.Subtract, expected: null }
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  it.each(testCases)('Should return expected argument', 
  ({a, b, action, expected}) => {
    const res = simpleCalculator({a, b, action});
    expect(res).toEqual(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
