import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1, 2, 3]);

    expect(list.value).toStrictEqual(1);
    expect(list.next?.value).toStrictEqual(2);
    expect(list.next?.next?.value).toStrictEqual(3);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2, 3]);

    expect(list).toMatchSnapshot();
  });
});
