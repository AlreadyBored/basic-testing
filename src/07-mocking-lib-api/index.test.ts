import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockedData = {
  data: { id: 1, name: 'Test' },
};
const baseURL = 'https://jsonplaceholder.typicode.com';
const pathMock = '/test';

describe('throttledGetDataFromApi', () => {
  const axiosMock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    axiosMock.create.mockReturnThis();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    axiosMock.get.mockResolvedValueOnce(mockedData);
    await throttledGetDataFromApi('');
    jest.runAllTimers();
    expect(axiosMock.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    axiosMock.get.mockResolvedValueOnce(mockedData);
    await throttledGetDataFromApi('');
    jest.runAllTimers();
    expect(axiosMock.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should return response data', async () => {
    axiosMock.get.mockResolvedValueOnce(mockedData);
    expect(await throttledGetDataFromApi(pathMock)).toEqual(mockedData.data);
  });
});
