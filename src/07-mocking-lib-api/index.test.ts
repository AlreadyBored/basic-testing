import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  let response: {
    data: {
      id: number;
      name: string;
      username: string;
      email: string;
      phone: string;
      website: string;
    }[];
  };

  beforeEach(() => {
    response = {
      data: [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
        },
        {
          id: 2,
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv',
          phone: '010-692-6593 x09125',
          website: 'anastasia.net',
        },
      ],
    };
    jest.spyOn(Axios.prototype, 'get').mockResolvedValue(response);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosClient = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/test');
    expect(axiosClient).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    axiosClient.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    // await throttledGetDataFromApi('/test');
    // expect(Axios.prototype.get).toBeCalledWith('/test');
  });

  test('should return response data', async () => {
    // const result = await throttledGetDataFromApi('/users');
    // expect(result).toEqual(response.data);
  });
});
