import { simpleCalculator, Action } from './index';

const args = {
  a: 3,
  b: 2,
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ ...args, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ ...args, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ ...args, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ ...args, action: Action.Divide })).toBe(1.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ ...args, action: Action.Exponentiate })).toBe(9);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ ...args, action: 'not existing action' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'string', b: 'string', action: Action.Add }),
    ).toBeNull();
  });
});
