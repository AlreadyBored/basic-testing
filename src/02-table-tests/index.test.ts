// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type TestCase = {
  a: number;
  b: number;
  action: Action;
  expected: number;
};

const testCases: TestCase[] = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
];

const testCallback = (item: TestCase) => () => {
  const { expected, ...rest } = item;

  expect(simpleCalculator(rest)).toBe(expected);
};

const getTestMessage = ({ a, b, action, expected }: TestCase) => {
  return `${a} ${action} ${b} should be ${expected}`;
};

describe('simpleCalculator', () => {
  testCases.forEach((item) => {
    it(getTestMessage(item), testCallback(item));
  });
});
