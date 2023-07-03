// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';
// const testCases = [
//   { a: 1, b: 2, action: Action.Add, expected: 3 },
//   { a: 2, b: 2, action: Action.Add, expected: 4 },
//   { a: 4, b: 2, action: Action.Subtract, expected: 2 },
//   { a: 8, b: 2, action: Action.Divide, expected: 4 },
//   { a: 4, b: 4, action: Action.Multiply, expected: 16 },
//   { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
//   { a: 'five', b: 4, action: "invalid action", expected: null },
//   { a: 5, b: "invalid arguments", action: Action.Multiply, expected: null },
// ];
const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 'five', b: 4, action: "invalid action", expected: null },
  { a: 5, b: "invalid arguments", action: Action.Multiply, expected: null },
]

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  let testCaseDescription;
  if (typeof a !== 'number' || typeof b !== 'number') {
    testCaseDescription = 'should return null for invalid arguments';
  } else if (!Object.values(Action).includes(action as any)) {
    testCaseDescription = 'should return null for invalid action';
  } else {
    const actionName = Object.entries(Action)
      .find((el) => el[1] === action)![0]
      .toLowerCase();
    testCaseDescription = `should ${actionName} two numbers`;
  }

  test(testCaseDescription, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});

