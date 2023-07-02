import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 1;
    const b = 2;
    const res = 3;

    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(res);
  });

  test('should subtract two numbers', () => {
    const a = 1;
    const b = 1;
    const res = 0;

    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(res);
  });

  test('should multiply two numbers', () => {
    const a = 3;
    const b = 5;

    const res = 15;

    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(res);
  });

  test('should divide two numbers', () => {
    const a = 10;
    const b = 2;
    const res = 5;

    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(res);
  });

  test('should exponentiate two numbers', () => {
    const a = 2;
    const b = 4;
    const res = 16;

    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBe(res);
  });

  test('should return null for invalid action', () => {
    const a = 1;
    const b = 1;
    const action = 'invalid action';

    expect(simpleCalculator({ a, b, action })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const a = 'invalid argument';
    const b = 'another invalid argument';

    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(null);
  });
});
