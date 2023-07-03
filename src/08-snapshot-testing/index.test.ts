import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1, 2])).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          next: null,
          value: null,
        },
      },
    });
  }, 30000);

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2, 3])).toMatchSnapshot();
  }, 30000);
});