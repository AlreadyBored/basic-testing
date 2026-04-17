import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [14, 16, 29, 101];
    const expected = {
      value: 14,
      next: {
        value: 16,
        next: {
          value: 29,
          next: {
            value: 101,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };
    expect(generateLinkedList(input)).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const input = [14, 16, 29, 101];
    expect(generateLinkedList(input)).toMatchSnapshot();
  });
});
