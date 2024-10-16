// Uncomment the code below and write your tests
import { simpleCalculator } from './index';

const testCases = [
  { a: 100, b: 200, action: '+', expected: 300 },
  { a: 100, b: 200, action: '-', expected: -100 },
  { a: 100, b: 2, action: '*', expected: 200 },
  { a: 100, b: 2, action: '/', expected: 50 },
  { a: 100, b: 3, action: '^', expected: 1000000 },
  { a: 100, b: 200, action: '0', expected: null },
  { a: ':-)', b: 2, action: '+', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator returns $expected, when a is $a, b is $b, and action is $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
