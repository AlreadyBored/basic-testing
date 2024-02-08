// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = (length: number) => Array.from({ length }, (_, i) => i);

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements(3))).toStrictEqual({
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
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements(50))).toMatchSnapshot();
  });
});
