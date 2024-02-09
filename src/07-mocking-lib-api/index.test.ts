// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const posts = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
];

const responce = {data: posts};

const mockAxios = axios as jest.Mocked<typeof axios>;
const relativePath = '/posts';

describe('throttledGetDataFromApi', () => {

  beforeEach(() => {
    jest.useFakeTimers();
    mockAxios.create.mockReturnThis();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.unmock('axios');
  })

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    mockAxios.get.mockResolvedValueOnce(responce);

    await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(mockAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    mockAxios.get.mockResolvedValueOnce(responce);

    await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(mockAxios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    mockAxios.get.mockResolvedValueOnce(responce);

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(responce.data);
  });
});
