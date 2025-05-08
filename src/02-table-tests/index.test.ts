// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

interface TestCase {
  a: number;
  b: number;
  action: Action;
  expected: number | null;
}

const testCases: TestCase[] = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },

  // Additional test cases
  // Add
  { a: 0, b: 0, action: Action.Add, expected: 0 },   // Adding zeros
  { a: -5, b: 5, action: Action.Add, expected: 0 },  // Adding negative and positive numbers
  { a: -5, b: -5, action: Action.Add, expected: -10 }, // Adding two negative numbers

  // Subtraction
  { a: 10, b: 5, action: Action.Subtract, expected: 5 }, // Simple subtraction
  { a: 5, b: 10, action: Action.Subtract, expected: -5 }, // Subtracting to get a negative number
  { a: 0, b: 5, action: Action.Subtract, expected: -5 }, // Subtracting number from zero
  { a: 5, b: 0, action: Action.Subtract, expected: 5 },  // Subtracting zero

  // Multiplication
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },  // Multiplying by zero
  { a: -6, b: 3, action: Action.Multiply, expected: -18 }, // Negative number multiplication
  { a: -6, b: -3, action: Action.Multiply, expected: 18 }, // Two negative numbers

  // Division
  { a: 10, b: 2, action: Action.Divide, expected: 5 }, // Simple division
  { a: 10, b: 0, action: Action.Divide, expected: Infinity }, // Division by zero
  { a: 0, b: 10, action: Action.Divide, expected: 0 }, // Zero divided by number
  { a: -6, b: 2, action: Action.Divide, expected: -3 }, // Dividing a negative number
  { a: -6, b: -2, action: Action.Divide, expected: 3 }, // Both numbers negative

  // Exponentiation
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 }, // Simple exponentiation
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 }, // n^0 = 1
  { a: 0, b: 5, action: Action.Exponentiate, expected: 0 }, // 0^n = 0 (n > 0)
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 }, // Negative base with an odd exponent
  { a: -2, b: 2, action: Action.Exponentiate, expected: 4 }, // Negative base with an even exponent

  // Invalid action
  { a: 5, b: 5, action: "InvalidAction" as Action, expected: null },
];

describe('simpleCalculator', () => {
  test.each<TestCase>(testCases)(
    'simpleCalculator($a, $b, $action) should return $expected', ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    }
  )
})
