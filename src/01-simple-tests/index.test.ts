// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const input = {
    a: 6,
    b: 2,
  };
  test('should add two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Add })).toBe(
      input.a + input.b,
    );
  });

  test('should substract two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Substract })).toBe(
      input.a - input.b,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Multiply })).toBe(
      input.a * input.b,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Divide })).toBe(
      input.a / input.b,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Exponentiate })).toBe(
      input.a ** input.b,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ ...input, action: 'add' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '6', b: '2', action: Action.Add })).toBeNull();
  });
});
