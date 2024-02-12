// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn), //fn) => fn // we used empty jest.fn() before - but it can take implementaion as parameter
  };
});

const mockedResponse = { data: 'I am your data. and tata.' };
const relativePath = 'apiPath';
// jest.mock('axios');

// jest.mock('axios', () => {
//   const originalModule = jest.requireActual('axios');
//   return {
//     __esModule: true,
//     ...originalModule,
//   };
// });

// jest.mock('axios', () => {
//   //const originalModule = jest.requireActual('axios');
//   return {
//     __esModule: true,
//     // ...originalModule,
//     create: jest.fn(function () {
//       return {
//         get: jest.fn(() => Promise.resolve(mockedResponse)),
//       };
//     }),
//   };
// });

describe('throttledGetDataFromApi', () => {
  // beforeAll(() => {

  // });

  afterAll(() => {
    jest.unmock('lodash');
    //jest.unmock('axios');
  });

  test('should create instance with provided base url', async () => {
    //const mockedCreate = jest.spyOn(axios, 'create');
    //jest.spyOn(axios, 'create');

    //axios.create().mockImplementation(() => Promise.resolve(response));

    jest.mock('axios.create.get', () =>
      jest.fn(() => Promise.resolve(mockedResponse)),
    );
    //jest.spyOn(axios.create(), 'get').mockResolvedValue(mockedResponse);
    const spyed = jest.spyOn(axios, 'create');
    const returned = await throttledGetDataFromApi(relativePath);
    expect(returned).toBe(mockedResponse.data);
    expect(spyed).toBeCalled();

    // const returned = await throttledGetDataFromApi(relativePath);
    // expect(returned).toBe('I am your data. and tata.');
    //expect(mockedCreate).toBeCalled();
    // expect(mockedCreate).toBeCalledWith({
    //   baseURL: 'https://jsonplaceholder.typicode.com',
    // });
  });

  // test('should perform request to correct provided url', async () => {
  //   const mockedGet = jest.spyOn(axios.create(), 'get'); //
  //   //const mockedCreate = jest.spyOn(axios.create());

  //   await throttledGetDataFromApi(relativePath);
  //   expect(mockedGet).toBeCalledWith(relativePath);
  // });

  // test('should return response data', async () => {
  //   const data = await throttledGetDataFromApi(path);
  //   expect(data).toBe('data');
  // });
});
