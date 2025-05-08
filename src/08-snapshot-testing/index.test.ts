import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1, 2, 3]);

    expect(list).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2, 3]);

    expect(list).toMatchSnapshot();
  });
});
