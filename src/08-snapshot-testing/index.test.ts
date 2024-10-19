import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 1, 1];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 1,
        next: {
          value: 1,
          next: { value: null, next: null },
        },
      },
    };

    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [2, 2, 2];

    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
