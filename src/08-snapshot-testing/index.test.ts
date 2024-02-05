// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const data = [1, 2, 3, 4, 5];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };
    const result = generateLinkedList(data);
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const data = [1, 2, 3, 4, 5];
    const result = generateLinkedList(data);
    expect(result).toMatchSnapshot();
  });
});
