import { generateLinkedList } from './index';

const mock = {
  next: {
    next: {
      next: {
        next: null,
        value: null,
      },
      value: 3,
    },
    value: 2,
  },
  value: 1,
};
describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const generatedArray = generateLinkedList([1, 2, 3]);

    expect(generatedArray).toStrictEqual(mock);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const generatedArray = generateLinkedList([2, 3]);

    expect(generatedArray).toMatchSnapshot();
  });
});
