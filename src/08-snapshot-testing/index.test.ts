import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];

    const result = generateLinkedList(elements);

    expect(result).toStrictEqual(result);
  });

  test('should generate linked list from values 2', () => {
    const elements = [4, 5, 6];

    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});
