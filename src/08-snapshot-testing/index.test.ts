// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    };

    const result = generateLinkedList(input);

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedOutput));

    expect(result).toStrictEqual(expectedOutput);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3, 4, 5];
    const result = generateLinkedList(input);

    expect(result).toMatchSnapshot();
  });
});
