// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const data = { a: 12, b: 13, action: Action.Add };
    const expected = data.a + data.b;

    expect(simpleCalculator(data)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const data = { a: 12, b: 13, action: Action.Subtract };
    const expected = data.a - data.b;

    expect(simpleCalculator(data)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const data = { a: 12, b: 13, action: Action.Multiply };
    const expected = data.a * data.b;

    expect(simpleCalculator(data)).toBe(expected);
  });

  test('should divide two numbers', () => {
    const data = { a: 12, b: 13, action: Action.Divide };
    const expected = data.a / data.b;

    expect(simpleCalculator(data)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const data = { a: 12, b: 13, action: Action.Exponentiate };
    const expected = data.a ** data.b;

    expect(simpleCalculator(data)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const data = { a: 12, b: 13, action: 'SQRT' };

    expect(simpleCalculator(data)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const data1 = { a: '12', b: 13, action: Action.Add };
    const data2 = { a: 12, b: null, action: Action.Add };
    const data3 = { a: undefined, b: undefined, action: Action.Add };

    expect(simpleCalculator(data1)).toBe(null);
    expect(simpleCalculator(data2)).toBe(null);
    expect(simpleCalculator(data3)).toBe(null);
  });
});
