import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 4, b: 2, action: Action.Add }
    const res = simpleCalculator(input);

    expect(res).toBe(6);
  });

  test('should subtract two numbers', () => {
    const input = { a: 4, b: 2, action: Action.Subtract }
    const res = simpleCalculator(input);

    expect(res).toBe(2);
  });

  test('should multiply two numbers', () => {
    const input = { a: 4, b: 2, action: Action.Multiply }
    const res = simpleCalculator(input);

    expect(res).toBe(8);
  });

  test('should divide two numbers', () => {
    const input = { a: 4, b: 2, action: Action.Divide }
    const res = simpleCalculator(input);

    expect(res).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 4, b: 2, action: Action.Exponentiate }
    const res = simpleCalculator(input);

    expect(res).toBe(16);
  });

  test('should return null for invalid action', () => {
    const input = { a: 4, b: 2, action: 'WrongAction'}
    const res = simpleCalculator(input);

    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'wrong', b: 5, action: Action.Add }
    const res = simpleCalculator(input);

    expect(res).toBeNull();
  });
});
