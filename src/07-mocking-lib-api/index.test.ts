// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const API_URL = '/api';
const BASE_URL = 'https://test.org';

jest.mock('axios');

const mockData = { data: 'test' };


describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  })

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockData)
    });
  })

  test('should create instance with provided base url', async () => {
    axios.create({ baseURL: BASE_URL });
    await throttledGetDataFromApi(API_URL);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(API_URL);
    jest.runAllTimers();
    const instance = axios.create();
    expect(instance.get).toHaveBeenCalledWith(API_URL);
  });

  test('should return response data', async () => {
    const receivedData = await throttledGetDataFromApi(API_URL);
    expect(receivedData).toBe(mockData.data);
  });
});
