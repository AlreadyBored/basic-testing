import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const EXPECTED_BASE_URL = 'https://jsonplaceholder.typicode.com';
const ENDPOINT = '/todos';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedData = {};

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue(mockedData);

    await throttledGetDataFromApi(EXPECTED_BASE_URL);

    expect(axios.create).toHaveBeenCalledWith({ baseURL: EXPECTED_BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    const mockedData = {};

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue(mockedData);

    await throttledGetDataFromApi(ENDPOINT);

    expect(axios.get).toHaveBeenCalledWith(ENDPOINT);
  });

  test('should return response data', async () => {
    const mockedData = {
      id: 123,
      userId: 987,
      completed: false,
      title: 'lorem ipsum',
    };

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue({ data: mockedData });

    const result = await throttledGetDataFromApi(`${ENDPOINT}/123`);

    expect(result).toEqual(mockedData);
  });
});
