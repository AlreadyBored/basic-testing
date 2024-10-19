import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const testCases = [
    { a: 5, b: 3, action: Action.Add, expected: 8 },
    { a: 10, b: 4, action: Action.Subtract, expected: 6 },
    { a: 7, b: 6, action: Action.Multiply, expected: 42 },
    { a: 9, b: 3, action: Action.Divide, expected: 3 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  ];

  test.each(testCases)(
    'should perform %p operation correctly',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 4, b: 2, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '4', b: 2, action: Action.Add });
    expect(result).toBeNull();
  });
});
