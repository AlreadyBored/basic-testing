import path from 'node:path';
import fs from 'node:fs';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should set timeout with provided callback and timeout', () => {
        const callbackMock = jest.fn();
        jest.spyOn(global, 'setTimeout');

        doStuffByTimeout(callbackMock, 1000);
        expect(setTimeout).toHaveBeenCalledWith(callbackMock, 1000);
    });

    test('should call callback only after timeout', () => {
        const callbackMock = jest.fn();

        doStuffByTimeout(callbackMock, 1000);
        expect(callbackMock).not.toBeCalled();

        jest.runAllTimers();

        expect(callbackMock).toBeCalled();
        expect(callbackMock).toHaveBeenCalledTimes(1);
    });
});

describe('doStuffByInterval', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should set interval with provided callback and timeout', () => {
        const callbackMock = jest.fn();
        jest.spyOn(global, 'setInterval');

        doStuffByInterval(callbackMock, 1000);
        expect(setInterval).toHaveBeenCalledWith(callbackMock, 1000);
    });

    test('should call callback multiple times after multiple intervals', () => {
        const callbackMock = jest.fn();
        jest.spyOn(global, 'setInterval');

        doStuffByInterval(callbackMock, 1000);

        expect(callbackMock).not.toBeCalled();

        jest.runOnlyPendingTimers();
        expect(callbackMock).toHaveBeenCalledTimes(1);

        jest.runOnlyPendingTimers();
        expect(callbackMock).toHaveBeenCalledTimes(2);
    });
});

describe('readFileAsynchronously', () => {
    test('should call join with pathToFile', async () => {
        const filePath = jest.spyOn(path, 'join');

        await readFileAsynchronously('data.txt');
        expect(filePath).toHaveBeenCalled();
    });

    test('should return null if file does not exist', async () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);

        const file = await readFileAsynchronously('data.txt');
        expect(file).toBe(null);
    });

    test('should return file content if file exists', async () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs.promises, 'readFile').mockResolvedValue('here Is Content');

        const fileContent = await readFileAsynchronously('data.txt');
        expect(fileContent).toEqual('here Is Content');
    });
});
