// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 1, b: 2, action: Action.Substract, expected: -1 },
    { a: 2, b: 2, action: Action.Substract, expected: 0 },
    { a: 3, b: 2, action: Action.Substract, expected: 1 },
    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
    { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },// continue cases for other actions
];

describe('simpleCalculator to pass table tests', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test('should make action on two numbers', () => {
    testCases.forEach(testCase => {
      const result = simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action
      });
      expect(result).toBe(testCase.expected);
    })
  });
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)('%action(%i, %i)', ({a, b, action, expected}) => {
    const result = simpleCalculator({
      a: a,
      b: b,
      action: action
    });
    expect(result).toBe(expected);
  });
});
