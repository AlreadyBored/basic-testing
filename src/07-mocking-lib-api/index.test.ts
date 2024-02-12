import axios from 'axios';

import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    axios.create = jest.fn(() => axios);
    // @ts-expect-error ts doesn't see that axios is mocked
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: [{ id: 1, name: 'books' }],
      });
    });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('');

    return expect(axios.create).toHaveBeenLastCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // TODO: implement test
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/some/url');

    return expect(result).toStrictEqual([{ id: 1, name: 'books' }]);
  });
});
