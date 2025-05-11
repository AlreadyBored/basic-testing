import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 42, b: 24, action: Action.Add })).toBe(66);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 42, b: 24, action: Action.Subtract })).toBe(
      18,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 42, b: 24, action: Action.Multiply })).toBe(
      1008,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 42, b: 24, action: Action.Divide })).toBe(
      1.75,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 42, b: 2, action: Action.Exponentiate })).toBe(
      1764,
    );
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 42, b: 2, action: 'InvalidAction' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: '42', b: 'Universe', action: Action.Multiply }),
    ).toBeNull();
  });
});
