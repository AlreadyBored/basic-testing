import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.spyOn('axios', 'create');
    throttledGetDataFromApi('todos/1');

    expect(axios.create).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com',
    );
  });

  test('should perform request to correct provided url', async () => {
    const todos = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
    ];
    axios.get.mockResolvedValueOnce(todos);

    const url = 'https://jsonplaceholder.typicode.com/todos';
    const res = throttledGetDataFromApi('todos');

    expect(axios.get).toHaveBeenCalledWith(url);
    expect(res).toEqual(todos);
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
