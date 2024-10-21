// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 5, b: 5, action: Action.Add, expected: 10 },
    { a: 15, b: 10, action: Action.Subtract, expected: 5 },
    { a: 15, b: 10, action: Action.Multiply, expected: 150 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

test.each(testCases)('should return %s when input is %i', ({a, b, action, expected}) => {
  expect(simpleCalculator({a, b, action})).toBe(expected);
});


