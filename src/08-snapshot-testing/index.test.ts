import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(['a', 'b', 'c']);

    expect(result).toStrictEqual({
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([1, 2, 3]);

    expect(result).toMatchSnapshot();
  });
});
