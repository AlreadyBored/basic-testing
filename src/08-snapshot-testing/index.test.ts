import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const snapshotList = generateLinkedList([
    {
      value: 1,
      next: null,
    },
  ]);
  const otherList = generateLinkedList([
    {
      value: 2,
      next: null,
    },
  ]);

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(snapshotList).not.toStrictEqual(otherList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(snapshotList).toMatchSnapshot();
  });
});
