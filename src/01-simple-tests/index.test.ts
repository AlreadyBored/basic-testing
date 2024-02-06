import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const randInt = () => Math.floor(Math.random() * 100);

  const a = randInt();
  const b = randInt();

  const rawInput: { a: number; b: number; action?: Action } = { a, b };

  test('should add two numbers', () => {
    expect(simpleCalculator({ ...rawInput, action: Action.Add })).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ ...rawInput, action: Action.Subtract })).toBe(
      a - b,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ ...rawInput, action: Action.Multiply })).toBe(
      a * b,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ ...rawInput, action: Action.Divide })).toBe(
      a / b,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ ...rawInput, action: Action.Exponentiate })).toBe(
      a ** b,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ ...rawInput, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const action =
      Object.values(Action)[
        Math.floor(Math.random() * Object.values(Action).length)
      ];

    expect(simpleCalculator({ a: 'a', b: 'b', action })).toBeNull();
  });
});
