import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    checkMathAction(Action.Add, (a, b) => a + b);
  });

  test('should subtract two numbers', () => {
    checkMathAction(Action.Subtract, (a, b) => a - b);
  });

  test('should multiply two numbers', () => {
    checkMathAction(Action.Multiply, (a, b) => a * b);
  });

  test('should divide two numbers', () => {
    checkMathAction(Action.Divide, (a, b) => a / b);
  });

  test('should exponentiate two numbers', () => {
    checkMathAction(Action.Exponentiate, (a, b) => a ** b);
  });

  test('should return null for invalid action', () => {
    checkCalculatorResult({ a: 1, b: 2, action: 'fake-action' }, null);
  });

  test('should return null for invalid arguments', () => {
    checkCalculatorResult({ a: '1', b: '2', action: Action.Add }, null);
  });
});

function checkMathAction(action: Action, cb: (a: number, b: number) => number) {
  const a = Math.random();
  const b = Math.random();
  checkCalculatorResult({ a, b, action }, cb(a, b));
}

function checkCalculatorResult(
  args: { a: unknown; b: unknown; action: string },
  expected: number | null,
) {
  expect(simpleCalculator(args)).toBe(expected);
}
