// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type Test = {
  [key: string]: {
    a: number | string;
    b: number | string;
    action: Action | null;
    expected: number | null;
  };
};

const tests: Test = {
  shouldAddTwoNumbers: { a: 2, b: 1, action: Action.Add, expected: 3 },
  shouldSubtractTwoNumbers: {
    a: 2,
    b: 1,
    action: Action.Subtract,
    expected: 1,
  },
  shouldMultiplyTwoNumbers: {
    a: 2,
    b: 1,
    action: Action.Multiply,
    expected: 2,
  },
  shouldDivideTwoNumbers: {
    a: 2,
    b: 1,
    action: Action.Divide,
    expected: 2,
  },
  shouldExponentiateTwoNumbers: {
    a: 2,
    b: 1,
    action: Action.Exponentiate,
    expected: 2,
  },
  shouldReturnNullForInvalidAction: {
    a: '2',
    b: '1',
    action: Action.Exponentiate,
    expected: null,
  },
  shouldReturnNullForInvalidArguments: {
    a: 2,
    b: 1,
    action: null,
    expected: null,
  },
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = tests.shouldAddTwoNumbers;
    input && expect(simpleCalculator(input)).toBe(input?.expected);
  });

  test('should subtract two numbers', () => {
    const input = tests.shouldSubtractTwoNumbers;
    input && expect(simpleCalculator(input)).toBe(input?.expected);
  });

  test('should multiply two numbers', () => {
    const input = tests.shouldMultiplyTwoNumbers;
    input && expect(simpleCalculator(input)).toBe(input?.expected);
  });

  test('should divide two numbers', () => {
    const input = tests.shouldDivideTwoNumbers;
    input && expect(simpleCalculator(input)).toBe(input?.expected);
  });

  test('should exponentiate two numbers', () => {
    const input = tests.shouldExponentiateTwoNumbers;
    input && expect(simpleCalculator(input)).toBe(input?.expected);
  });

  test('should return null for invalid action', () => {
    const input = tests.shouldReturnNullForInvalidAction;
    input && expect(simpleCalculator(input)).toBe(input?.expected);
  });

  test('should return null for invalid arguments', () => {
    const input = tests.shouldReturnNullForInvalidArguments;
    input && expect(simpleCalculator(input)).toBe(input?.expected);
  });
});
