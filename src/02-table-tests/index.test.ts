import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 5, action: Action.Add, expected: 10 },
  { a: 5, b: 5, action: Action.Subtract, expected: 0 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: 5, b: 5, action: 'some invalid action', expected: null },
  { a: '5', b: '', action: Action.Add, expected: null },
];

describe('simpleCalculator tests', () => {
  test.each(testCases)(
    'should perform $action on $a and $b and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
