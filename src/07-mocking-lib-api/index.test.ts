import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts/1';
  const data = {
    data: {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
  };
  beforeEach(() => {
    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue(data);
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('should create instance with provided base url', async () => {
    const expectedBaseUrl = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: expectedBaseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    const expectedUrl = `https://jsonplaceholder.typicode.com${relativePath}`;
    const consoleSpy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi(expectedUrl);

    expect(consoleSpy).toHaveBeenCalledWith(expectedUrl);
  });

  test('should return response data', async () => {
    const expectedUrl = `https://jsonplaceholder.typicode.com${relativePath}`;

    const result = await throttledGetDataFromApi(expectedUrl);

    expect(result).toEqual(data.data);
  });
});
