// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const answer = simpleCalculator({ a: 5, b: 4, action: Action.Add })
    expect(answer).toBe(9)
  });

  test('should subtract two numbers', () => {
    const answer = simpleCalculator({ a: 9, b: 4, action: Action.Subtract })
    expect(answer).toBe(5)
  });

  test('should multiply two numbers', () => {
    const answer = simpleCalculator({ a: 6, b: 2, action: Action.Multiply })
    expect(answer).toBe(12)
  });

  test('should divide two numbers', () => {
    const answer = simpleCalculator({ a: 8, b: 2, action: Action.Divide })
    expect(answer).toBe(4)
  });

  test('should exponentiate two numbers', () => {
    const answer = simpleCalculator({ a: 5, b: 2, action: Action.Exponentiate })
    expect(answer).toBe(25)
  });

  test('should return null for invalid action', () => {
    const answer = simpleCalculator({ a: 3, b: 4, action: 'invalid action' })
    expect(answer).toBe(null)
  });

  test('should return null for invalid arguments', () => {
    const answer = simpleCalculator({ a: 3, b: 'invalid arguments', action: Action.Add })
    expect(answer).toBe(null)
  });
});
