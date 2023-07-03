import { generateLinkedList } from './index';

const values = [1, 2, 3];

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    // generateLinkedList(values)
    console.log(generateLinkedList(values));
  });
});
