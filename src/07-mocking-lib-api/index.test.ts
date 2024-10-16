import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  const originalModule = jest.requireActual<typeof import('axios')>('axios');
  return {
    ...originalModule,
    create: jest.fn(() => originalModule),
  };
});

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts';

  beforeAll(() => {
    jest.mock('axios');
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const customBaseUrl = 'https://custom.typicode.com';
    const axiosInstance = axios.create({ baseURL: customBaseUrl });
    expect(axiosInstance.defaults.baseURL).toContain(customBaseUrl);
  });

  test('should perform request to correct provided url', async () => {
    const createdAxiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    const getSpy = jest.spyOn(createdAxiosInstance, 'get');
    jest.spyOn(axios, 'create').mockImplementation(() => createdAxiosInstance);

    await throttledGetDataFromApi(relativePath);
    expect(getSpy).toBeCalledWith(relativePath);

    getSpy.mockRestore();
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(relativePath);
    expect(response).not.toBeNull();
    expect(response).not.toBeUndefined();
  });
});

jest.unmock('axios');
