import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const res = generateLinkedList(['value 1', 'value 2']);
    expect(res).toStrictEqual({
      value: 'value 1',
      next: {
        value: 'value 2',
        next: {
          value: null,
          next: null,
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const res = generateLinkedList(['value 1', 'value 2']);
    expect(res).toMatchSnapshot();
  });
});