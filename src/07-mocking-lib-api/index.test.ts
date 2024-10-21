// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index'; 

describe('throttledGetDataFromApi', () => {
  const actualBaseURL = "https://jsonplaceholder.typicode.com";
  const path = "/posts/1";
  test('should create instance with provided base url', async () => {
    const createInstanceSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(path);
    expect(createInstanceSpy).toBeCalledWith({ baseURL: actualBaseURL });  });

    test('should perform request to correct provided url', async () => {
      const createInstanceSpy = jest.spyOn(axios, 'create');
      createInstanceSpy.mockImplementationOnce((config) => {
        const result = axios.create(config);
        const getSpy = jest.spyOn(result, 'get');
        expect(getSpy).toBeCalledWith(path);
        return result;
      })
      await throttledGetDataFromApi(path);
    });


 test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);
    const actualData = {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    };
    expect(result).toStrictEqual(actualData);
  });
});