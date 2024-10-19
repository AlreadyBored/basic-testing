// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  {
    description: 'should add two numbers',
    input: { a: 2, b: 3, action: Action.Add },
    expected: 5,
  },
  {
    description: 'should subtract two numbers',
    input: { a: 5, b: -3, action: Action.Subtract },
    expected: 8,
  },
  {
    description: 'should multiply two numbers',
    input: { a: 5, b: -3, action: Action.Multiply },
    expected: -15,
  },
  {
    description: 'should divide two numbers',
    input: { a: 6, b: 3, action: Action.Divide },
    expected: 2,
  },
  {
    description: 'should exponentiate two numbers',
    input: { a: 2, b: 3, action: Action.Exponentiate },
    expected: 8,
  },
  {
    description: 'should return null for invalid action',
    input: { a: 2, b: 3, action: 'invalid' },
    expected: null,
  },
  {
    description: 'should return null for invalid arguments',
    input: { a: '2', b: 3, action: Action.Add },
    expected: null,
  },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ description, input, expected }) => {
    test(description, () => {
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });
});
