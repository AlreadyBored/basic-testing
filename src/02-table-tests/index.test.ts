import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 10, b: 49, action: Action.Add, expected: 59 },
  { a: 67, b: 8, action: Action.Subtract, expected: 59 },
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 120, b: 3, action: Action.Divide, expected: 40 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 59, b: 59, action: 'InvalidAction', expected: null },
  { a: '59', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
