// Uncomment the code below and write your tests
import axios from 'axios';
import {throttledGetDataFromApi} from './index';

describe('throttledGetDataFromApi', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });
    test('should create instance with provided base url', async () => {
        const axiosCreateSpy = jest.spyOn(axios, 'create');
        await throttledGetDataFromApi('/users');

        jest.runAllTimers();
        expect(axiosCreateSpy).toHaveBeenCalledWith({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });
    });

    test('should perform request to correct provided url', async () => {
        const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
        await throttledGetDataFromApi('/users');

        jest.runAllTimers();
        expect(axiosGetSpy).toHaveBeenCalledTimes(1);
    });

    test('should return response data', async () => {
        const responseData = {
            user1: {
                user_id: 1,
                user_name: 'Nune',
            },
            user2: {
                user_id: 2,
                user_name: 'Lilt',
            },
            user3: {
                user_id: 3,
                user_name: 'Levon',
            },
            user4: {
                user_id: 4,
                user_name: 'Zara',
            },
        };

        jest
            .spyOn(axios.Axios.prototype, 'get')
            .mockResolvedValue({data: responseData});
        const response = await throttledGetDataFromApi('/users');

        expect(response).toBe(responseData);
    });
});
