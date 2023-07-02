// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = ['val1', 'val2', 'val3'];
    const linkList = generateLinkedList(values);
    const expectedLinkList = {
      next: {
        next: { next: { next: null, value: null }, value: 'val3' },
        value: 'val2',
      },
      value: 'val1',
    };

    expect(linkList).toStrictEqual(expectedLinkList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['val4', 'val5', 'val6'];
    const linkList = generateLinkedList(values);

    expect(linkList).toMatchSnapshot();
  });
});
