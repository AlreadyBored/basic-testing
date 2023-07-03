// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const array = 'qwerty'.split('');
const list = {
  value: 'q',
  next: {
    value: 'w',
    next: {
      value: 'e',
      next: {
        value: 'r',
        next: {
          value: 't',
          next: {
            value: 'y',
            next: {
              value: null,
              next: null,
            }, // next-back hell :)
          },
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(
      generateLinkedList(array)
    ).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(
      generateLinkedList(array)
    ).toMatchSnapshot();
  });
});
