// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    // continue cases for other actions 
    { a: 10, b: 20, action: Action.Subtract, expected: -10 },
    { a: 70, b: 20, action: Action.Subtract, expected: 50 },
    { a: 33, b: 11, action: Action.Subtract, expected: 22 },
    { a: 15, b: 3, action: Action.Divide, expected: 5 },
    { a: 25, b: 5, action: Action.Divide, expected: 5 },
    { a: 35, b: 7, action: Action.Divide, expected: 5 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 4, b: 3, action: Action.Multiply, expected: 12 },
    { a: 5, b: 4, action: Action.Multiply, expected: 20 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
    { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
    { a: 3, b: 2, action: "**", expected: null }, 
    { a: 3, b: 2, action: "Action.Add", expected: null },
    { a: 3, b: 2, action: "1324", expected: null },
    { a: "qewrq", b: 2, action: Action.Add, expected: null },
    { a: false, b: 2, action: Action.Add, expected: null },
    { a: undefined, b: 2, action: Action.Add, expected: null },  
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test('should blah-blah', () => {
    expect(true).toBe(true);
  });
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)("test $a $action $b = $expected", ({ a, b, action, expected}) => {
    const params = {
      a: a,
      b: b,
      action: action
    }
    expect(simpleCalculator(params)).toBe(expected);
  });
});
