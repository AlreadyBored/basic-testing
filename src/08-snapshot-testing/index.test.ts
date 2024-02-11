// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

//Your task is to use snapshot testing with Jest and compare it to regular comparison testing.
describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3, 4, 5];

    const linkedList = generateLinkedList(elements);

    expect(linkedList).toMatchSnapshot();
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [null, 0.1, 2, 13];
    const linkedList = generateLinkedList(elements);
    expect(linkedList).toMatchSnapshot();
  });
});
