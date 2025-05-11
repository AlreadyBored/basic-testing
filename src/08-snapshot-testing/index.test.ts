// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test.skip('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: null,
        },
      },
    };
    const result = generateLinkedList(values);
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test.skip('should generate linked list from values 2', () => {
    const values = [1, 2, 3];
    const result = generateLinkedList(values);
    expect(result).toMatchSnapshot();
  });
});
