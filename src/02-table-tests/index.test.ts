import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 100, b: 1, action: Action.Subtract, expected: 99 },
  { a: -4, b: 9, action: Action.Subtract, expected: -13 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 5, b: 0, action: Action.Multiply, expected: 0 },
  { a: -3, b: -2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: -7, b: 2, action: Action.Divide, expected: -3.5 },
  { a: 8, b: 3, action: Action.Exponentiate, expected: 512 },
  { a: 56, b: 5, action: Action.Exponentiate, expected: 550731776 },
  { a: -3, b: 5, action: Action.Exponentiate, expected: -243 },
  { a: 5, b: 2, action: 'smile', expected: null },
  { a: 5, b: 2, action: 567, expected: null },
  { a: 5, b: 2, action: null, expected: null },
  { a: 'ola', b: 2, action: Action.Add, expected: null },
  { a: 3, b: () => console.log('piupiu'), action: Action.Add, expected: null },
  { a: { name: 'ponchik' }, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
