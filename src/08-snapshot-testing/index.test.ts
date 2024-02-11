import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([5, 1])).toStrictEqual({
      value: 5,
      next: { value: 1, next: { value: null, next: null } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = {
      value: 3,
      next: { value: 5, next: { value: null, next: null } },
    };
    expect(generateLinkedList([3, 5])).toMatchSnapshot(linkedList);
  });
});
