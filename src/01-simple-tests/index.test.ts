import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const mockData = { a: 6, b: 3 };

  test('should add two numbers', () => {
    const result = simpleCalculator({ ...mockData, action: Action.Add });
    expect(result).toBe(9);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ ...mockData, action: Action.Subtract });
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ ...mockData, action: Action.Multiply });
    expect(result).toBe(18);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ ...mockData, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      ...mockData,
      action: Action.Exponentiate,
    });
    expect(result).toBe(216);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      ...mockData,
      action: 'invalid action',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '10',
      b: 10,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
