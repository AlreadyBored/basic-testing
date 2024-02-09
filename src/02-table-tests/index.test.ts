// Uncomment the code below and write your tests
 import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 }, 
    { a: 12, b: 5, action: Action.Subtract, expected: 7 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 }, 
    { a: 12, b: 2, action: Action.Exponentiate, expected: 144 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 }, 
    { a: 12, b: 2, action: Action.Multiply, expected: 24 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 }, 
    { a: 12, b: 2, action: Action.Divide, expected: 6 },
    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 3, b: 2, action: Action.Divide, expected: 1.5 }, 
];

describe('simpleCalculator', () => {

  test.each(testCases)('should action: "$action" two numbers', 
    ({a, b, action, expected}) => {
    expect(simpleCalculator({
      a,b, action
    })).toBe(expected);
  })

  test.each([
    { a: 2, b: 2, action: 'bla', expected: null },
    { a: 'string', b: undefined, action: Action.Divide, expected: null }, 
  ])('should return null; action: "$action" a: "$a" b: "$b"', 
    ({a, b, action, expected}) => {
    expect(simpleCalculator({
      a,b, action
    })).toBe(expected);
  })
});
