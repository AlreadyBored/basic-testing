// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const positiveTestCases = [
  { a: 1, b: -2, action: Action.Add, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'invalid', expected: null },
  { a: 'invalid', b: 3, action: Action.Add, expected: null },
];

const edgeTestCases = [
  {
    a: Number.MAX_VALUE,
    b: Number.MAX_VALUE,
    action: Action.Add,
    expected: Infinity,
  },
  { a: -0, b: 0, action: Action.Subtract, expected: -0 },
  {
    a: Number.MAX_VALUE,
    b: Number.MAX_VALUE,
    action: Action.Multiply,
    expected: Infinity,
  },
  { a: 6, b: 0, action: Action.Divide, expected: Infinity },
  {
    a: Number.MAX_VALUE,
    b: Number.MAX_VALUE,
    action: Action.Exponentiate,
    expected: Infinity,
  },
];

const negativeTestCases = [
  {
    a: NaN,
    b: NaN,
    action: Action.Add,
    expected: NaN,
  },

  {
    a: Infinity,
    b: Infinity,
    action: Action.Multiply,
    expected: Infinity,
  },
];

describe('simpleCalculator', () => {
  describe('should pass positive cases', () => {
    it.each(positiveTestCases)(
      'should return $expected when $a is $action $b',
      ({ a, b, action, expected }) => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      },
    );
  });

  describe('should pass edge cases', () => {
    it.each(edgeTestCases)(
      'should return $expected when $a is $action $b',
      ({ a, b, action, expected }) => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      },
    );
  });

  describe('should pass negative cases', () => {
    it.each(negativeTestCases)(
      'should return $expected when $a is $action $b',
      ({ a, b, action, expected }) => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      },
    );
  });
});
