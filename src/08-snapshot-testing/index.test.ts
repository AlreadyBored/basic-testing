import { generateLinkedList } from './index';

const values1 = [1, 2];
const expected1 = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: null,
      next: null,
    },
  },
};

const values2 = [1, 2, 3, 4, 5, 6, 7];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values1)).toStrictEqual(expected1);
  });

  test('should generate linked list from values 2', () => {
    const expected2 = generateLinkedList(values2);
    expect(expected2).toMatchSnapshot();
  });
});
