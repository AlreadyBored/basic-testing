// Uncomment the code below and write your tests
 import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Add })).toBe(2);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator( { a: 2, b: 2, action: Action.Multiply })).toBe(4);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator( { a: 9, b: 3, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator( { a: 3, b: 3, action: Action.Exponentiate })).toBe(27);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator( { a: 3, b: 3, action: 'Do I look like an action?' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator( { a: 'A', b: 'B', action: 'Sideli na trube' })).toBeNull(); // are error mesages with toBeNull() really nicer? 
    expect(simpleCalculator( { a: 'A', b: 2, action: Action.Divide })).toBeNull();
    expect(simpleCalculator( { a: 2, b: 'B', action: Action.Multiply })).toBeNull();

  });

  // test('should return null for invalid arguments', () => {
  //   expect(simpleCalculator( { a: 2, b: 2, action: Action.Add })).toBeNull(); // are error mesages with toBeNull() really nicer? 
  // });
});
