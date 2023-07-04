import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
  }, 30000);

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 53, b: 21, action: Action.Subtract })).toBe(
      32,
    );
  }, 30000);

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 6, action: Action.Multiply })).toBe(42);
  }, 30000);

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 52, b: 2, action: Action.Divide })).toBe(26);
  }, 30000);

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate })).toBe(
      16,
    );
  }, 30000);

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 40, b: 2, action: 'SomeAction' })).toBe(null);
  }, 30000);

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '40', b: 2, action: Action.Add })).toBe(null);
  }, 30000);
});
