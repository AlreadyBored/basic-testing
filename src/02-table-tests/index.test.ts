import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 'invalid', b: 'invalid', action: 'invalidAction', expected: null },
  { a: null, b: null, action: null, expected: null },
  { a: undefined, b: undefined, action: undefined, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given a: $a, b: $b, action: $action, returns $expected',
    ({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toEqual(expected);
    },
  );
});
