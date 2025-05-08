// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    // Check match by expect(...).toStrictEqual(...)
    expect(generateLinkedList([1, 2])).toStrictEqual({
      value: 1,
      next: { value: 2, next: { value: null, next: null } },
    });

    expect(generateLinkedList([])).toStrictEqual({ value: null, next: null });
  });

  test('should generate linked list from values 2', () => {
    // Check match by comparison with snapshot
    expect(generateLinkedList(['a', 'b', 'c'])).toMatchSnapshot();
    expect(generateLinkedList([])).toMatchSnapshot();
  });
});
