import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },

    { a: 4, b: 2, action: Action.Subtract, expected: 2 },
    { a: 9, b: 3, action: Action.Subtract, expected: 6 },
    { a: 12, b: 2, action: Action.Subtract, expected: 10 },

    { a: 4, b: 2, action: Action.Multiply, expected: 8 },
    { a: 9, b: 3, action: Action.Multiply, expected: 27 },
    { a: 12, b: 2, action: Action.Multiply, expected: 24 },

    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: 9, b: 3, action: Action.Divide, expected: 3 },
    { a: 12, b: 2, action: Action.Divide, expected: 6 },

    { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
    { a: 9, b: 3, action: Action.Exponentiate, expected: 729 },
    { a: 12, b: 2, action: Action.Exponentiate, expected: 144 },
       
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return correct response for test cases',
    ({ a, b, action, expected }) => {
      const input = { a, b, action }
      const res = simpleCalculator(input);

      expect(res).toBe(expected);
    }
  );
});
