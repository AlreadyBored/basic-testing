// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: null,
        },
      },
    };
expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c'];
    const expectedLinkedList = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: null,
        },
      },
    };
    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });
});