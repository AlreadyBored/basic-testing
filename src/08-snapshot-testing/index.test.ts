import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const elements = [1, 2, 3];
    const valuesList = generateLinkedList(elements);
    const res = {
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
    expect(valuesList).toStrictEqual(res);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c', 'd', 'e'];
    const valuesList = generateLinkedList(elements);
    expect(valuesList).toMatchSnapshot();
  });
});
