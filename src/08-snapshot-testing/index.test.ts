// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const el = [1];
    const par = { value: null, next: null }
    const exp = {
      value: 1,
      next: par,
    };
    expect(generateLinkedList(el)).toStrictEqual(exp);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const el = [1, 2, 3];
    expect(generateLinkedList(el)).toMatchSnapshot();
  });
});
