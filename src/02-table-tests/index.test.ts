// Uncomment the code below and write your tests
import { simpleCalculator, Action } from "./index";

const testCases = [
  { a: 5, b: 7, action: Action.Add, expected: 12 },
  { a: 5, b: 7, action: Action.Subtract, expected: -2 },
  { a: 5, b: 7, action: Action.Multiply, expected: 35 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: null, action: Action.Exponentiate, expected: null },
  { a: 6, b: null, action: Action, expected: null }
];

describe("simpleCalculator", () => {
  test.each(testCases)(
    "a: $a, b: $b, action: $action should return $expected",
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      if (Number.isInteger(expected)) {
        expect(result).toBe(expected);
      } else {
        expect(result);
      }
    }
  );
});
