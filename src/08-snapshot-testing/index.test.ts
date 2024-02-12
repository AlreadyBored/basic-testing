// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const args = [1, 2, 3];
    const expected = {
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
    };
    expect(generateLinkedList(args)).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const args = [2, 3, 4];
    const expected = {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: {
            value: null,
            next: null
          }
        }
      }
    };
    expect(generateLinkedList(args)).toStrictEqual(expected);
  });
});
