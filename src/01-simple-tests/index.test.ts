// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

const a = 0.2;
const b = 0.1;
const actionResult = {
  [Action.Add]: a + b,
  [Action.Subtract]: a - b,
  [Action.Multiply]: a * b,
  [Action.Divide]: a / b,
  [Action.Exponentiate]: a ** b,
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;

    const result = simpleCalculator({ a, b, action });

    expect(result).toBe(actionResult[action]);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;

    const result = simpleCalculator({ a, b, action });

    expect(result).toBe(actionResult[action]);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;

    const result = simpleCalculator({ a, b, action });

    expect(result).toBe(actionResult[action]);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;

    const result = simpleCalculator({ a, b, action });

    expect(result).toBe(actionResult[action]);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;

    const result = simpleCalculator({ a, b, action });

    expect(result).toBe(actionResult[action]);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: 'Invalid' });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '0', b: '2', action: Action.Divide });

    expect(result).toBeNull();
  });
});
