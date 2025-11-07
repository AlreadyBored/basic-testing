/* eslint-disable prettier/prettier */
// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { name: 'Add', a: 1, b: 2, action: Action.Add, expected: 3 },
  { name: 'Add', a: 2, b: 2, action: Action.Add, expected: 4 },
  { name: 'Subtract', a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { name: 'Multiply', a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { name: 'Divide', a: 10, b: 2, action: Action.Divide, expected: 5 },
  // eslint-disable-next-line prettier/prettier
  { name: 'Exponentiate', a: 2, b: 3, action: Action.Exponentiate, expected: 8},
];

describe('simpleCalculator (table tests)', () => {
  test.each(testCases)('$name', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});

const invalidCases = [
  { name: 'invalid action returns null', a: 2, b: 3, action: '%' },
  { name: 'non-number a returns null', a: '2', b: 3, action: Action.Add },
  { name: 'non-number b returns null', a: 2, b: '3', action: Action.Add },
  { name: 'both args invalid return null', a: 'x', b: 'y', action: Action.Multiply },
];

test.each(invalidCases)('$name', ({ a, b, action }) => {
  const result = simpleCalculator({ a, b, action });
  expect(result).toBeNull();
});
