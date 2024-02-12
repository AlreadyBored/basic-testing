// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: '3', b: '2', action: Action.Add, expected: null },
  { a: 3, b: 2, action: '', expected: null },
];

describe.each(testCases)(
  'simpleCalculator table-driven',
  ({ a, b, action, expected }) => {
    test(`should returns ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });

    if (
      typeof a !== 'number' ||
      typeof b !== 'number' ||
      !Object.values(Action).includes(action as Action)
    ) {
      test('should returns null', () => {
        expect(simpleCalculator({ a, b, action })).toBeNull();
      });
    }
  },
);
