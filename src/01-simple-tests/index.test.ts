import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  test('adds two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Add };
    expect(simpleCalculator(input)).toBe(5);
  });

  test('subtracts two numbers', () => {
    const input = { a: 5, b: 2, action: Action.Subtract };
    expect(simpleCalculator(input)).toBe(3);
  });

  test('multiplies two numbers', () => {
    const input = { a: 4, b: 3, action: Action.Multiply };
    expect(simpleCalculator(input)).toBe(12);
  });

  test('divides two numbers', () => {
    const input = { a: 10, b: 2, action: Action.Divide };
    expect(simpleCalculator(input)).toBe(5);
  });

  test('exponentiates two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    expect(simpleCalculator(input)).toBe(8);
  });

  test('returns null for invalid action', () => {
    const input = { a: 2, b: 3, action: '%' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('returns null for non-number a', () => {
    const input = { a: '2', b: 3, action: Action.Add };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('returns null for non-number b', () => {
    const input = { a: 2, b: '3', action: Action.Add };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('returns null for missing action', () => {
    const input = { a: 2, b: 3, action: undefined };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('returns null for completely invalid input', () => {
    const input = { a: null, b: {}, action: 'invalid' };
    expect(simpleCalculator(input)).toBeNull();
  });
});
