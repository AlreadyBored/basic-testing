import { TIMEOUT_TEST } from 'utils';
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const linkedList = generateLinkedList([1, 2, 3, 'three and the half']);

  // Check match by expect(...).toStrictEqual(...)
  test(
    'should generate linked list from values 1',
    () => {
      expect(linkedList).toStrictEqual({
        next: {
          next: {
            next: {
              next: { next: null, value: null },
              value: 'three and the half',
            },
            value: 3,
          },
          value: 2,
        },
        value: 1,
      });
    },
    TIMEOUT_TEST,
  );

  test(
    'should generate linked list from values 2',
    () => {
      expect(linkedList).toMatchSnapshot();
    },
    TIMEOUT_TEST,
  );
});
