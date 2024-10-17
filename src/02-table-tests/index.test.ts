// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },

    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 0, b: 2, action: Action.Subtract, expected: -2 },
    { a: 10, b: 2, action: Action.Subtract, expected: 8 },

    { a: 10, b: 2, action: Action.Multiply, expected: 20 },
    { a: 0, b: 2, action: Action.Multiply, expected: 0 },
    { a: 1, b: 5, action: Action.Multiply, expected: 5 },

    { a: 5, b: 1, action: Action.Divide, expected: 5 },
    { a: 10, b: 5, action: Action.Divide, expected: 2 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },

    { a: 8, b: 0, action: '', expected: null},
    { a: 2, b: 3, action: 'some action', expected: null },
    { a: 1, b: 2, action: 'add', expected: null },

    { a: 1, b: '2', action: Action.Add, expected: null },
    { a: '1', b: 2, action: Action.Divide, expected: null },
    { a: 1, b: [1, 2], action: Action.Exponentiate, expected: null },   
];

describe('simpleCalculator', () => {
  test.each(testCases)('test math operations of simple calculator', ({a, b, action, expected}) => {
    expect(simpleCalculator({a, b, action})).toBe(expected)
  })
});
