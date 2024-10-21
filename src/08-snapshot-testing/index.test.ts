import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const actualList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null
          }
        }
      }
    }
    const values1 = [1,2,3];
    const list = generateLinkedList(values1);
    expect(list).toStrictEqual(actualList)
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const values2 = [0,1,1,2,3,5,8,13,21];
    const list = generateLinkedList(values2);
    expect(list).toMatchSnapshot();
  });
});