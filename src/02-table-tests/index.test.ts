// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // Add more test cases for other actions
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  // Add invalid test cases
  { a: 'invalid', b: 3, action: Action.Add, expected: null },
  { a: 2, b: 'invalid', action: Action.Add, expected: null },
  { a: 2, b: 3, action: 'INVALID' as Action, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should perform ${action} operation correctly`, () => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    });
  });
});