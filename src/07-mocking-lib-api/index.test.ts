// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockData = {
    data: {
      id: 1,
      title: 'mocked title',
    },
  }

  const baseUrlMock = 'https://jsonplaceholder.typicode.com';

  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(() => {
    jest.runOnlyPendingTimers()
    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue(mockData);
  })
  
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(baseUrlMock);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseUrlMock,
    });
  });

  test('should perform request to correct provided url', async () => {
    const expectdPath = 'path/to/resource';
    await throttledGetDataFromApi(expectdPath);

    expect(axios.get).toHaveBeenCalledWith(expectdPath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('');

    expect(result).toEqual(mockData.data);
  });
});
