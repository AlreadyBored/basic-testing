// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },

    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 1, b: 3, action: Action.Subtract, expected: -2 },
    { a: 100, b: -50, action: Action.Subtract, expected: 150 },

    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 10, b: -10, action: Action.Multiply, expected: -100 },
    { a: -100, b: -100, action: Action.Multiply, expected: 10000 },

    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 10, b: -5, action: Action.Divide, expected: -2 },
    { a: -30, b: -10, action: Action.Divide, expected: 3 },

    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 10, b: -2, action: Action.Exponentiate, expected: 0.01 },
    { a: 12, b: 2, action: Action.Exponentiate, expected: 144 },
];

describe('simpleCalculator', () => {
  const testText = 'describe should return correct result';

  test.each(testCases)(testText, (eachCase) => {
    const { a, b, action, expected } = eachCase;

    const answer = simpleCalculator({ a, b, action });
    expect(answer).toEqual(expected);
  });
});
