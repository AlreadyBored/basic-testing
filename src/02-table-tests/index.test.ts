// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    {a: 10, b: 15, action: Action.Subtract, expected: -5},
    {a: 4, b: 1, action: Action.Subtract, expected: 3},
    {a: 5, b: 5, action: Action.Multiply, expected: 25},
    {a: 5, b: 0, action: Action.Multiply, expected: 0},
    {a: -5, b: 2, action: Action.Multiply, expected: -10},
    {a: 18, b: 3, action: Action.Divide, expected: 6},
    {a: 18, b: 0, action: Action.Divide, expected: Infinity},
    {a: 18, b: -3, action: Action.Divide, expected: -6},
    {a: 4, b: 3, action: Action.Exponentiate, expected: 64},
    {a: 4, b: 0.5, action: Action.Exponentiate, expected: 2},
    {a: 4, b: 0, action: Action.Exponentiate, expected: 1},
    {a: 4, b: -0.5, action: Action.Exponentiate, expected: 0.5},
    {a: 4, b: 3, action: '=', expected: null},
    {a: 4, b: 3, action: '&', expected: null},
    {a: '4', b: 3, action: '+', expected: null},
    {a: 4, b: true, action: '+', expected: null},
    {a: 4, b: {b: 4}, action: '+', expected: null}   
];

describe('simpleCalculator', () => {
  test.each(testCases)('Table test', ({a, b, action, expected}) => {
    expect(simpleCalculator({a,b, action})).toBe(expected);
  })
});
