import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: null
        }
      }
    };

    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c'];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
