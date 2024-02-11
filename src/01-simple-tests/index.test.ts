// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  it('adds two numbers', () => {
    const input = { a: 1, b: 2, action: Action.Add };
    expect(simpleCalculator(input)).toBe(3);
  });

  it('subtracts two numbers', () => {
    const input = { a: 3, b: 2, action: Action.Subtract };
    expect(simpleCalculator(input)).toBe(1);
  });

  it('multiplies two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Multiply };
    expect(simpleCalculator(input)).toBe(6);
  });

  it('divides two numbers', () => {
    const input = { a: 6, b: 2, action: Action.Divide };
    expect(simpleCalculator(input)).toBe(3);
  });

  it('exponentiates two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    expect(simpleCalculator(input)).toBe(8);
  });
  
  it('returns null for invalid input', () => {
    const input = { a: 'invalid', b: 2, action: Action.Add };
    expect(simpleCalculator(input)).toBeNull();
  });
});
