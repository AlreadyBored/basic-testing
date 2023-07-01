import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([1]);

    expect(result).toStrictEqual({ value: 1, next: generateLinkedList([]) });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([1, 2, 3]);

    expect(result).toMatchSnapshot();
  });
});
