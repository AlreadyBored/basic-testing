import { simpleCalculator, Action } from './index';

// type TestCase = {
//   a: number;
//   b: number;
//   action: Action;
//   expected: number;
//   title: string;
// };

const testCases = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
    title: 'should add two numbers',
  },
  {
    a: 4,
    b: 1,
    action: Action.Subtract,
    expected: 3,
    title: 'should subtract two numbers',
  },
  {
    a: 1,
    b: 4,
    action: Action.Multiply,
    expected: 4,
    title: 'should multiply two numbers',
  },
  {
    a: 4,
    b: 1,
    action: Action.Divide,
    expected: 4,
    title: 'should divide two numbers',
  },
  {
    a: 4,
    b: 1,
    action: Action.Exponentiate,
    expected: 4,
    title: 'should exponentiate two numbers',
  },
  {
    a: 2,
    b: 3,
    action: 'No Action',
    expected: null,
    title: 'should return null for invalid action',
  },
  {
    a: 4,
    b: '1',
    action: Action.Exponentiate,
    expected: null,
    title: 'should return null for invalid arguments',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$title', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
