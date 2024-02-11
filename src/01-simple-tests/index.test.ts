// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const answer = simpleCalculator({ a: 2, b: 2, action: Action.Add });
    expect(answer).toEqual(4);
  });

  test('should subtract two numbers', () => {
    const answer = simpleCalculator({ a: 2, b: 2, action: Action.Subtract });
    expect(answer).toEqual(0);
  });

  test('should multiply two numbers', () => {
    const answer = simpleCalculator({ a: 2, b: 2, action: Action.Multiply });
    expect(answer).toEqual(4);
  });

  test('should divide two numbers', () => {
    const answer = simpleCalculator({ a: 2, b: 2, action: Action.Multiply });
    expect(answer).toEqual(4);
  });

  test('should exponentiate two numbers', () => {
    const answer = simpleCalculator({ a: 2, b: 2, action: Action.Divide });
    expect(answer).toEqual(1);
  });

  test('should return null for invalid action', () => {
    const answer = simpleCalculator({ a: 2, b: 2, action: '' });
    expect(answer).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const answer = simpleCalculator({ a: 'a', b: 2, action: Action.Divide });
    expect(answer).toEqual(null);
  });
});
