// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 3, action: 'Do I look like an action?', expected: null },
  { a: 'A', b: 'B', action: 'Sideli na trube', expected: null },
  { a: 'A', b: 2, action: Action.Divide, expected: null },
  { a: 2, b: 'B', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  // for (const testCase of testCases) {
  //   test(`${testCase.a} ${testCase.action} ${testCase.b} expected to be ${testCase.expected}`);
  //   expect(simpleCalculator( { a: 'A', b: 'B', action: 'Sideli na trube' })).toBeNull(); // are error mesages with toBeNull() really nicer? 
  // }

  test.each(testCases)(
    'I guess no real parameters interpolation can be used here',
    ({ a, b, action, expected }) => {
      console.log(`${a} ${action} ${b} expected to be ${expected}`);
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
