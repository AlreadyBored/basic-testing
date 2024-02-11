import { simpleCalculator, Action } from './index';
const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // Add more test cases for other actions
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} when performing ${action} on ${a} and ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
