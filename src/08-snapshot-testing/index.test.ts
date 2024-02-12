import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1];
    const expectedLinkedList = {
      next: {
        next: null,
        value: null,
      },
      value: 1,
    };
    const linkedList = generateLinkedList(values);

    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const values = [4, 5, 6];
    const expectedLinkedLis = `{
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 4,
        },
        value: 5,
      },
      value: 6,
    }`;
    const linkedList = generateLinkedList(values);

    expect(linkedList).toMatchSnapshot(expectedLinkedLis);
  });
});
