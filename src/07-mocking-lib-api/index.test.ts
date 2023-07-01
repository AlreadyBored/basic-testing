import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const testURL = '/posts/1';
const baseURL = 'https://jsonplaceholder.typicode.com';
const data = {
  someField: 'someValue',
  otherField: 12345,
  thirdField: true,
};

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: data }),
    });
    await throttledGetDataFromApi(testURL);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: data }),
    });
    await throttledGetDataFromApi(testURL);
    jest.runAllTimers();

    const instance = axios.create();
    expect(instance.get).toHaveBeenCalledWith(testURL);
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: data }),
    });
    const receivedData = await throttledGetDataFromApi(testURL);
    expect(receivedData).toBeTruthy();
    expect(receivedData).toBe(data);
  });
});