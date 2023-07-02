import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import { TIMEOUT_TEST } from 'utils';

type UserT = {
  id: string;
  name: string;
  username: string;
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const USERS_PATH = 'users';

const MOCK_RESPONSE_DATA: UserT[] = [
  { id: '1', name: 'Joan Doe', username: 'joan' },
  { id: '2', name: 'John Doe', username: 'johnny' },
  { id: '3', name: 'Cersei Lannister', username: 'crazyqueen' },
];

describe('throttledGetDataFromApi', () => {
  let spyGet: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    spyGet?.mockClear();

    spyGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: MOCK_RESPONSE_DATA }));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test(
    'should create instance with provided base url',
    async () => {
      const spyCreate = jest.spyOn(axios, 'create');

      await throttledGetDataFromApi(USERS_PATH);
      jest.runAllTimers();

      expect(spyCreate).toHaveBeenCalledWith({ baseURL: BASE_URL });
    },
    TIMEOUT_TEST,
  );

  test(
    'should perform request to correct provided url',
    async () => {
      await throttledGetDataFromApi(USERS_PATH);
      jest.runAllTimers();

      expect(spyGet).toBeCalledWith(USERS_PATH);
    },
    TIMEOUT_TEST,
  );

  test(
    'should return response data',
    async () => {
      const users: UserT[] = await throttledGetDataFromApi(USERS_PATH);

      expect(users).toEqual(MOCK_RESPONSE_DATA);
    },
    TIMEOUT_TEST,
  );
});
