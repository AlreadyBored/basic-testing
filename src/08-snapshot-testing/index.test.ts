// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const elements = [1, 2, 3];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(elements);

    expect(linkedList).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(elements);

    expect(linkedList).toMatchSnapshot();
  });
});
