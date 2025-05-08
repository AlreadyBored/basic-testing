import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  test.each([
    { a: 1, b: 3, action: Action.Add, expected: 4 },
    { a: 4, b: 2, action: Action.Subtract, expected: 2 },
    { a: 1, b: 3, action: Action.Multiply, expected: 3 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 1, b: 'hello', action: Action.Multiply, expected: null },
    { a: 1, b: 3, action: '**', expected: null },
  ])(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
