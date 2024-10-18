// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const mockedLinkedList = {
  next: {
    next: {
      next: {
        next: null,
        value: null,
      },
      value: 1,
    },
    value: 1,
  },
  value: 1,
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1, 1, 1])).toStrictEqual(mockedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    expect(generateLinkedList([2, 2, 2])).toMatchSnapshot();
  });
});
