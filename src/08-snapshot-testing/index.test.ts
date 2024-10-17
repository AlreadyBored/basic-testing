import { generateLinkedList } from './index';

const values1 = [{ value: 1, next: null }];
const values2 = [
  { value: 1, next: null },
  { value: 2, next: null },
];

const expected = {
  value: { value: 1, next: null },
  next: { value: null, next: null },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values1)).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const expected = generateLinkedList(values2);
    expect(expected).toMatchSnapshot();
  });
});
