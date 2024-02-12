// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const testArr = [1, 2, 3];
    const expectedLinkedList = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    const generatedLinkedList = generateLinkedList(testArr);

    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const testArr = [1, 2, 3];
    const generatedLinkedList = generateLinkedList(testArr);

    expect(generatedLinkedList).toMatchSnapshot();
  });
});
