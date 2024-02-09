// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3, 4, 5];
    const linkedList = generateLinkedList(elements);

    expect(linkedList).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null
              }
            }
          }
        }
      }
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = ['one', 'two', 'three', 'four', 'five'];
    const linkedList = generateLinkedList(elements);

    expect(linkedList).toMatchSnapshot();
  });
});
