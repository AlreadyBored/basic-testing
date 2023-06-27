// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 4 },
  // continue cases for other actions
];

const testCasesArray = testCases.map((item) => Object.values(item));
describe('simpleCalculator', () => {
  test.each(testCasesArray)(
    'arguments %i and %i with action %s should be equal %i',
    (a, b, action, expected) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
