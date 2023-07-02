import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 1, b: 2, action: Action.Subtract, expected: -1 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 1, b: 1, action: null, expected: null },
    { a: 1, b: 1, action: undefined, expected: null },
    { a: 1, b: 1, action: 'InvalidAction', expected: null },
    { a: 1, b: 'InvalidValue', action: Action.Exponentiate, expected: null },
    { a: 1, b: null, action: Action.Exponentiate, expected: null },
    { a: 1, b: undefined, action: Action.Exponentiate, expected: null },
]; 

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    const { a, b, action, expected } = testCase;

    test(`should ${action} ${a} and ${b} to equal ${expected}`, () => {
      const result = simpleCalculator({ a, b, action });
      if (expected === null) {
        expect(result).toBeNull();
      } else {
        expect(result).toEqual(expected);
      }
    });
  });
});
