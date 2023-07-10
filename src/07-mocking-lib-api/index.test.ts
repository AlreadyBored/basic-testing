import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

// jest.mock('axios', () => {
//   const originalAxios = jest.requireActual('axios');
//   return {
//     __esModule: true,
//     ...originalAxios,
//     create: jest.fn(() => ({
//       get: jest.fn(),
//     })),
//   };
// });

// const axiosMock: any = {
//   create: jest.fn(() => axiosMock),
//   get: jest.fn(),
// };

const relativePath = 'users';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);

    // toHaveBeenCalledWith -to verify that a mocked function has been called at least once with specific arguments
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    createSpy.mockClear(); // manually clear the mocks after this test
  });

  test('should perform request to correct provided url', async () => {
    // const getSpy = jest.spyOn(axios.create(), 'get');
    // await throttledGetDataFromApi(relativePath); // Call the throttled function to trigger the request
    // expect(getSpy).toBeCalledWith(relativePath);
    // getSpy.mockClear(); // manually clear the mocks after this test
    // or variant2
    // const getSpy = jest.spyOn(axios, 'get');
    // await throttledGetDataFromApi(relativePath);
    // expect(getSpy).toHaveBeenCalledWith(relativePath);
    // getSpy.mockClear();
  });

  test('should return response data', async () => {
    // const response = await throttledGetDataFromApi(relativePath);
    // expect(response).toBe('response');
  });
});
