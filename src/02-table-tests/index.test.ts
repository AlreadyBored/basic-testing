import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },

    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 10, b: 5, action: Action.Subtract, expected: 5 },
    { a: 3, b: 8, action: Action.Subtract, expected: -5 },

    { a: 2, b: 3, action: Action.Multiply, expected: 6 },
    { a: 0, b: 5, action: Action.Multiply, expected: 0 },
    { a: -2, b: 3, action: Action.Multiply, expected: -6 },

    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 5, b: 0, action: Action.Divide, expected: Infinity },

    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
    { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },
  ];

  test.each(testCases)(
    'should return $expected for a=$a, b=$b, action=$action',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: 'invalid_action' });
    expect(result).toBeNull();
  });

  test.each([
    { a: '2', b: 3, action: Action.Add },
    { a: 2, b: null, action: Action.Subtract },
    { a: 2, b: 3, action: undefined },
  ])(
    'should return null for invalid arguments (a=$a, b=$b, action=$action)',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );
});
