import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = [1, 2, 3];
  const expectedLinkedList = {
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

  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const resultList = generateLinkedList(elements);
    expect(resultList).toMatchSnapshot();
  });
});
