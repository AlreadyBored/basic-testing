// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

type DataType = {
  id: number;
  title: string;
};

describe('throttledGetDataFromApi', () => {
  let relativePath: string;
  let expectedData: DataType;

  beforeAll(() => {
    relativePath = '/posts/1';
    expectedData = { id: 1, title: 'hello' };

    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const expectedBaseUrl = 'https://jsonplaceholder.typicode.com';

    const spyCreate = jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedData }));

    await throttledGetDataFromApi(relativePath);
    jest.runOnlyPendingTimers();

    expect(spyCreate).toBeCalledWith({ baseURL: expectedBaseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const spyGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedData }));

    await throttledGetDataFromApi(relativePath);
    jest.runOnlyPendingTimers();

    expect(spyGet).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedData }));

    const result = await throttledGetDataFromApi(relativePath);
    jest.runOnlyPendingTimers();

    expect(result).toEqual(expectedData);
  });
});
