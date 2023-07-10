import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(['first', null]);
    const expectedLinkedList = {
      value: 'first',
      next: {
        value: null,
        next: null,
      },
    };
    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  /* For the first test case failure, because
  The expected linked list is:
  {
  "value": "first",
  "next": {
    "value": null,
    "next": null
    }
  }
  But the received linked list is:
  {
  "value": "first",
  "next": {
    "next": null, // <--reverse order
    "value": null // <--reverse order
    }
  } */

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([true, 20, 'element', {}]);

    expect(linkedList).toMatchSnapshot();
  });
});

/* For the second test case, the snapshot comparison fails as well because the received linked list does not match the snapshot.
For passing the case it must be like that
  const linkedList = generateLinkedList([true, 20, 'element', {}]);
  const expectedLinkedList = {
    value: true,
    next: {
      value: 20,
      next: {
        value: 'element',
        next: {
          value: {},
          next: null,
        },
      },
    },
  };
  expect(linkedList).toEqual(expectedLinkedList);
*/
