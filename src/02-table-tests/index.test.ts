import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 478539,
    b: 758375,
    action: Action.Add,
    expected: 1236914,
  },
  {
    a: 936813,
    b: 273485,
    action: Action.Subtract,
    expected: 663328,
  },
  {
    a: 4723,
    b: 6791,
    action: Action.Multiply,
    expected: 32073893,
  },
  {
    a: 9879653,
    b: 24586,
    action: Action.Divide,
    expected: 401.8406003416579,
  },
  {
    a: 34,
    b: 5,
    action: Action.Exponentiate,
    expected: 45435424,
  },
  {
    a: 8,
    b: 4,
    action: 'INVALID ACTION',
    expected: null,
  },
  {
    a: { prop: 'value' },
    b: [1, 2, 3],
    action: Action.Subtract,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('Different test cases', (arg) =>
    Promise.resolve(simpleCalculator(arg)),
  );
});
