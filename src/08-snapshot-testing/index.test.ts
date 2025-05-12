import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const result = generateLinkedList(elements);
    const expected = {
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
    };
    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const elements = ['x', 'y', 'z'];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
