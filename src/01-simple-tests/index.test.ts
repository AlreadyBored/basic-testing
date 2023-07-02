import { simpleCalculator, Action } from './index';
import { TIMEOUT_TEST } from '../utils';

describe('simpleCalculator tests', () => {
  test(
    'should add two numbers',
    () => {
      expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    },
    TIMEOUT_TEST,
  );

  test(
    'should subtract two numbers',
    () => {
      expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toBe(1);
    },
    TIMEOUT_TEST,
  );

  test(
    'should multiply two numbers',
    () => {
      expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toBe(6);
    },
    TIMEOUT_TEST,
  );

  test(
    'should divide two numbers',
    () => {
      expect(simpleCalculator({ a: 12, b: 2, action: Action.Divide })).toBe(6);
    },
    TIMEOUT_TEST,
  );

  test(
    'should exponentiate two numbers',
    () => {
      expect(
        simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate }),
      ).toBe(1);
    },
    TIMEOUT_TEST,
  );

  test(
    'should return null for invalid action',
    () => {
      expect(
        simpleCalculator({
          a: 2,
          b: 6,
          action: 'Give me one billion bucks, please',
        }),
      ).toBeNull();
    },
    TIMEOUT_TEST,
  );

  test(
    'should return null for invalid arguments',
    () => {
      expect(
        simpleCalculator({ a: 'one', b: 2, action: Action.Add }),
      ).toBeNull();
    },
    TIMEOUT_TEST,
  );
});
