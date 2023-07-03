import { simpleCalculator, Action, RawCalculatorInput } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 144, b: 12, action: Action.Subtract, expected: 132 },
  { a: 144, b: 12, action: Action.Divide, expected: 12 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 7, action: Action.Multiply, expected: 14 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 144, b: 12, action: 'nonexist', expected: null },
  { a: '144', b: 12, action: Action, expected: null },
];
describe('simpleCalculator', () => {
  it.each<RawCalculatorInput & { expected: number | null }>(testCases)(
    '$a $action $b should be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
