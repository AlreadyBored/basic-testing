import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  // TODO: Maybe, but I'm not sure
  test('should create instance with provided base url', async () => {
    const relativePath = '/posts';
    const create = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  // TODO:
  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  // TODO: axiosClient missing props
  test('should return response data', async () => {
    // const relativePath = '/posts';
    // const responseMock = { data: 'mocked data' };
    // jest
    //   .spyOn(axios, 'create')
    //   .mockReturnValue({ get: jest.fn().mockResolvedValueOnce(responseMock) });
    // const result = await throttledGetDataFromApi(relativePath);
    // expect(result).toEqual(responseMock.data);
  });
});
