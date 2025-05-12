// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockAxiosCreate = axios.create as jest.MockedFunction<
  typeof axios.create
>;
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

const testPath = '/testPath';
const mockResponseData = 'reponse-data';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockAxiosCreate.mockReturnThis();
    mockAxiosGet.mockResolvedValue({ data: mockResponseData });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const expectedPayload = { baseURL: 'https://jsonplaceholder.typicode.com' };

    await throttledGetDataFromApi(testPath);
    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.create).toHaveBeenCalledWith(expectedPayload);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(testPath);
    jest.runAllTimers();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(testPath);
  });

  test('should return response data', async () => {
    await throttledGetDataFromApi(testPath);
    jest.runAllTimers();

    await expect(throttledGetDataFromApi(testPath)).resolves.toBe(
      mockResponseData,
    );
  });
});
