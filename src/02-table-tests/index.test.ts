// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases: Array<{
  a: number | string;
  b: number | string;
  action: Action | string;
  matcher: 'toEqual' | 'toBeNull';
  value: number | string | null;
}> = [
  { a: 2, b: 2, action: Action.Add, matcher: 'toEqual', value: 4 },
  { a: 0, b: 1, action: Action.Subtract, matcher: 'toEqual', value: -1 },
  { a: -2, b: 2, action: Action.Multiply, matcher: 'toEqual', value: -4 },
  { a: 4, b: 2, action: Action.Divide, matcher: 'toEqual', value: 2 },
  { a: -4, b: 2, action: Action.Exponentiate, matcher: 'toEqual', value: 16 },
  { a: 0, b: 0, action: 'Invalid Action', matcher: 'toEqual', value: null },
  { a: 'a', b: 'b', action: Action.Add, matcher: 'toEqual', value: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'should return "$value" for "$a $action $b"',
    ({ a, b, action, matcher, value }) => {
      expect(simpleCalculator({ a, b, action }))[matcher](value);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
