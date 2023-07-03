import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 2;
    const b = 3;
    const sum = 5;
    const action = Action.Add;

    expect(simpleCalculator({ a, b, action })).toBe(sum);
  });

  test('should subtract two numbers', () => {
    const a = 10;
    const b = 2;
    const action = Action.Subtract;

    expect(simpleCalculator({ a, b, action })).toBe(8);
  });

  test('should multiply two numbers', () => {
    const a = 10;
    const b = 2;
    const action = Action.Multiply;

    expect(simpleCalculator({ a, b, action })).toBe(20);
  });

  test('should divide two numbers', () => {
    const a = 10;
    const b = 2;
    const action = Action.Divide;

    expect(simpleCalculator({ a, b, action })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const a = 10;
    const b = 2;
    const action = Action.Exponentiate;

    expect(simpleCalculator({ a, b, action })).toBe(100);
  });

  test('should return null for invalid action', () => {
    const a = 10;
    const b = 2;
    const action = 'Sub';

    expect(simpleCalculator({ a, b, action })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const a = 10;
    const b = '2';
    const action = Action.Subtract;

    expect(simpleCalculator({ a, b, action })).toBe(null);
  });
});
