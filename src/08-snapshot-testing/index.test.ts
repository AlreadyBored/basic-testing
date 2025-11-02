// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const array = ['roots', 'trunk', 'branches'];

    const checkTest = {
      value: 'roots',
      next: {
        value: 'trunk',
        next: {
          value: 'branches',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(array)).toStrictEqual(checkTest);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const array = ['head', 'neck', 'body', 'tail'];
    expect(generateLinkedList(array)).toMatchSnapshot();
  });
});
