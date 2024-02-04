// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const items = ['apple', 'banana'];

    const exptectedResult = {
      value: 'apple',
      next: { value: 'banana', next: { value: null, next: null } },
    };

    const linkedList = generateLinkedList(items);

    expect(linkedList).toStrictEqual(exptectedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const items = ['peach', 'pear'];

    const linkedList = generateLinkedList(items);

    expect(linkedList).toMatchSnapshot();
  });
});
