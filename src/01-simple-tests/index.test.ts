import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Add })).toBe(7);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Exponentiate })).toBe(
      64,
    );
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 3, b: 4, action: 'invalidAction' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'string', b: {}, action: Action.Add }),
    ).toBeNull();
  });
});
