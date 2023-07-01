// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };
    const result = generateLinkedList(values);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [2];
    const expectedLinkedList = {
      value: 2,
      next: {
        value: null,
        next: null,
      },
    };
    const result = generateLinkedList(values);
    expect(result).toStrictEqual(expectedLinkedList);
  });
});
