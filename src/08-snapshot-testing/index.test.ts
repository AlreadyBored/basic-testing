import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2];
    const result = generateLinkedList(values);

    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const values = [1, 2];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
