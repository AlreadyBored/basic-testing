import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBeNull();
  });
});
