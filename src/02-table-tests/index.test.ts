// Uncomment the code below and write your tests
import {simpleCalculator, Action} from './index';

const testCases = [
    {a: 1, b: 2, action: Action.Add, expected: 3},
    {a: 2, b: 2, action: Action.Add, expected: 4},
    {a: 3, b: 2, action: Action.Add, expected: 5},
    {a: 1, b: 2, action: Action.Subtract, expected: -1},
    {a: 2, b: 2, action: Action.Subtract, expected: 0},
    {a: 3, b: 2, action: Action.Subtract, expected: 1},
    {a: 9, b: 3, action: Action.Divide, expected: 3},
    {a: 16, b: 8, action: Action.Divide, expected: 2},
    {a: 121, b: 11, action: Action.Divide, expected: 11},
    {a: 5, b: 4, action: Action.Multiply, expected: 20},
    {a: 7, b: 8, action: Action.Multiply, expected: 56},
    {a: 6, b: 9, action: Action.Multiply, expected: 54},
    {a: 4, b: 3, action: Action.Exponentiate, expected: 64},
    {a: 6, b: 8, action: Action.Exponentiate, expected: 1679616},
    {a: 5, b: 7, action: Action.Exponentiate, expected: 78125}
];

describe('simpleCalculator', () => {
    testCases.forEach(({a, b, action, expected}, index) => {
        test(`Test Case ${index + 1}: ${a} ${action} ${b} should be ${expected}`, () => {
            const result = simpleCalculator({a, b, action});
            expect(result).toBe(expected);
        });
    });
});
