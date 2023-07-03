// Uncomment the code below and write your tests
 import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 10, b: 2, action: Action.Subtract, expected: 8 },

    // continue cases for other actions    
]; 
const testCases2 = [
  { a: 30, b: 5, action: "Action", expected: null},
  { a: 30, b: "5", action: Action.Add, expected: null},  
]; 

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests

  it.each(testCases)(
    "bla bla bla",
    ({ a,b,action, expected }) => {
      expect(simpleCalculator({ a, b, action})).toBe(expected);
    }
  );
  it.each(testCases2)(
    "bla bla bla",
    ({ a,b,action }) => {
      expect(simpleCalculator({ a, b, action})).toBeNull();
    }
  );
  // Consider to use Jest table tests API to test all cases above
});
