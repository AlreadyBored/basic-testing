// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    simpleCalculator({ a: 2, b: 3, action: Action.Add });
  });

  test('should subtract two numbers', () => {
    simpleCalculator({ a: 6, b: 3, action: Action.Subtract });
  });

  test('should multiply two numbers', () => {
    simpleCalculator({ a: 2, b: 3, action: Action.Multiply });
  });

  test('should divide two numbers', () => {
    simpleCalculator({ a: 6, b: 3, action: Action.Divide });
  });

  test('should exponentiate two numbers', () => {
    simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
  });

  test('should return null for invalid action', () => {
    simpleCalculator({ a: 2, b: 3, action: Action });
  });

  test('should return null for invalid arguments', () => {
    simpleCalculator({ a: '2', b: '3', action: Action.Add });
  });
});
