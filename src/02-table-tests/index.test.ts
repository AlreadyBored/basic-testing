import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 3, b: 3, action: 'invalid', expected: null },
  { a: '3', b: '3', action: Action.Add, expected: null },
  { a: false, b: true, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test('should blah-blah', () => {
    expect(true).toBe(true);
  });

  test.each(testCases)(
    'Should return expected values',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
