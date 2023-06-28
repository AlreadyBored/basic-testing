// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 1, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: null, expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform %p with a=%p and b=%p',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
