// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers()

});
describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const url = axios.create({
      baseURL
    });
    const axiosGetSpy = jest.spyOn(axios, 'create')
    const spy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve({ url }));
    await throttledGetDataFromApi('baseURL')
    jest.runAllTimers();
    expect(axiosGetSpy).toHaveBeenCalledWith({
      baseURL,
    });
    spy.mockRestore()
  })

  test('should perform request to correct provided url', async () => {
    const axiosSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve({ data: 'users' }));
    await throttledGetDataFromApi('/path/');
    jest.runOnlyPendingTimers();
    expect(axiosSpy).toBeCalledWith('/path/');
    axiosSpy.mockRestore()
  })
  test('should return response data', async () => {
    const users = [
      { id: 1, name: 'Mark', age: 19 },
      { id: 2, name: 'Alex', age: 28 },
      { id: 3, name: 'Felix', age: 24 },
      { id: 4, name: 'Alfred', age: 38 },
      { id: 5, name: 'Sebastian', age: 26 },
    ];
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve({ data: users }));
    const data = await throttledGetDataFromApi('response_data');
    jest.runAllTimers();
    expect(data).toEqual('users')
  });
});

