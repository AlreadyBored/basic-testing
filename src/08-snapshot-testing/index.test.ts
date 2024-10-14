// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values1 = [1, 2, 3];
  const values2 = [4, 5, 6];
  const expected = {
    next: { next: { next: { next: null, value: null }, value: 3 }, value: 2 },
    value: 1,
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const list = generateLinkedList(values1);
    expect(list).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const list = generateLinkedList(values2);
    expect(list).toMatchSnapshot('list');
  });
});
