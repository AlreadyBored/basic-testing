// Uncomment the code below and write your tests
 import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
	 { a: 5, b: 2, action: Action.Subtract, expected: 3 },
    { a: 6, b: 2, action: Action.Subtract, expected: 4 },
    { a: 7, b: 2, action: Action.Subtract, expected: 5 },
    { a: 2, b: 3, action: Action.Multiply, expected: 6 },
    { a: 2, b: 4, action: Action.Multiply, expected: 8 },
    { a: 2, b: 5, action: Action.Multiply, expected: 10 },
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
    { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },  
]; 

describe('simpleCalculator', () => {

	it.each(testCases)(
		"should $a $action $b $expected",
		({ a, b , action, expected}) => {
		  const result = simpleCalculator({a, b, action});
  
		  expect(result).toBe(expected);
		}
	 );


	// Object.values(Action).forEach(action => {
	// 	console.log(action)
	//   describe(`Action: ${action}`, () => {
	// 	 testCases.forEach(({ a, b, expected }) => {
	// 		test(`should ${action} ${a} and ${b} to equal ${expected}`, () => {
	// 		  const result = simpleCalculator({ a, b, action });
	// 		  expect(result).toBe(expected);
	// 		});
	// 	 });
	//   });
	// });
 });
