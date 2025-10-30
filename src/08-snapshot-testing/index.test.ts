// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Регулярное сравнение
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null, // Дополнительный узел с null в конце
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(input)).toStrictEqual(expectedOutput);
  });

  // Тест с использованием снимка
  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3];
    const linkedList = generateLinkedList(input);

    // Создание и сравнение снимка
    expect(linkedList).toMatchSnapshot();
  });
});
