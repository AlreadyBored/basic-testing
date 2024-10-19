/* eslint-disable prettier/prettier */
// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';
console.log('Jest is running outside test');
describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(result).toBe(8);
    console.log(result, 'add');
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
    console.log(result, 'subtract');
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 7, action: Action.Multiply });
    expect(result).toBe(42);
    console.log(result, 'multiply');
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 20, b: 5, action: Action.Divide });
    expect(result).toBe(4);
    console.log(result, 'divide');
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
    console.log(result, 'exponentiate');
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: 'invalid' });
    expect(result).toBeNull();
    console.log(result, 'invalid action');
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '10', b: 5, action: Action.Add });
    expect(result).toBeNull();
    console.log(result, 'invalid arguments');
  });
});
