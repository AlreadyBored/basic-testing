// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const relativePath = 'relativePath';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    // await throttledGetDataFromApi(relativePath);
    // expect();
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: 'Response' });

    await expect(throttledGetDataFromApi(relativePath)).toEqual('Response');
  });
});
