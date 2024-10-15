import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const expected = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    const result = generateLinkedList(values);
    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c'];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });

  test('should return null node for empty array', () => {
    const result = generateLinkedList([]);
    const expected = { value: null, next: null };

    expect(result).toStrictEqual(expected);
  });
});
