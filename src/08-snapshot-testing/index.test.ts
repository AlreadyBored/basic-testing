// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const arrayElements = (length = 1) => Array.from(Array(length).keys());

  test('should generate linked list from values 1', () => {
    const baseLinkedList = {
      value: 0,
      next: {
        value: 1,
        next: {
          value: 2,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(arrayElements(3))).toStrictEqual(baseLinkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(arrayElements(20))).toMatchSnapshot();
  });
});
