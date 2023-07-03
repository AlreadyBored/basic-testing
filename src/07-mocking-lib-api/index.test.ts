import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock<typeof import('axios')>('axios');
const mockedAxios = jest.mocked(axios);
const data = {
  users: [],
};
mockedAxios.get.mockRejectedValue({
  data,
});
const baseURL = 'https://jsonplaceholder.typicode.com';
const param = 'users';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    throttledGetDataFromApi(param);
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    // mockedAxios.get.mockRejectedValue({
    //   data,
    // });
    // throttledGetDataFromApi(param);
    // expect(mockedAxios.get).toHaveBeenCalledWith(param);
  });

  test('should return response data', async () => {
    // const res = await throttledGetDataFromApi('users');
    // expect(res).toStrictEqual(data);
  });
});
