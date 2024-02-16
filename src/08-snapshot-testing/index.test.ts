import { generateLinkedList } from './index';

type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1]);
    const expectList: LinkedListNode<number> = {
      value: 1,
      next: { value: null, next: null },
    };
    expect(list).toStrictEqual(expectList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2]);
    expect(list).toMatchSnapshot();
  });
});
