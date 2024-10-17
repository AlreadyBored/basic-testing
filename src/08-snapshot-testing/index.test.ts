import { generateLinkedList } from '08-snapshot-testing';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            next: null,
            value: null,
          },
        },
      },
    };

    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [4, 5, 6];
    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});
