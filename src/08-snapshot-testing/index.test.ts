import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const res = generateLinkedList(['/test', '/test2']);
    expect(res).toStrictEqual({
      value: '/test',
      next: {
        value: '/test2',
        next: null,
      },
    }); //проверяет и структуру по указанной
  });

  test('should generate linked list from values 2', () => {
    const res = generateLinkedList(['/test', '/test2']);
    expect(res).toMatchSnapshot(); //создает снимок результата
  });
});
