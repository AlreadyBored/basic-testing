import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const res = generateLinkedList([1]);
    expect(res).toStrictEqual({ value: 1, next: { value: null, next: null } });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const res = generateLinkedList([1, 4]);
    expect(res).toMatchSnapshot(
      '{ value: 1, next: { value: 4, next: { value: null, next: null } } }',
    );
  });
});
