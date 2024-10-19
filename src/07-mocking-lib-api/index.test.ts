import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TEST_ENDPOINT = '/users/1';
const USER_RESPONSE = { id: 1, name: 'user1' };

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue(axios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: USER_RESPONSE });
    await throttledGetDataFromApi(TEST_ENDPOINT);

    expect(axios.create).toHaveBeenCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: USER_RESPONSE });

    await throttledGetDataFromApi(TEST_ENDPOINT);
    expect(axios.get).toHaveBeenCalledWith(TEST_ENDPOINT);
  });

  test('should return response data', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: USER_RESPONSE });

    const result = await throttledGetDataFromApi(TEST_ENDPOINT);
    expect(result).toEqual(USER_RESPONSE);
  });
});
