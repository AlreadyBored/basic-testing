import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from ".";
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import * as path from "path";

jest.mock("fs");
jest.mock("fs/promises");
jest.mock("path");

describe("doStuffByTimeout", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should set timeout with provided callback and timeout", () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutMock = jest.spyOn(global, "setTimeout");

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
    setTimeoutMock.mockRestore();
  });

  test("should call callback only after timeout", () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe("doStuffByInterval", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should set interval with provided callback and timeout", () => {
    const callback = jest.fn();
    const timeout = 1000;

    const setTimeoutMock = jest.spyOn(global, "setTimeout");

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutMock).toHaveBeenCalledWith(callback, timeout);
    setTimeoutMock.mockRestore();
  });

  test("should call callback multiple times after multiple intervals", () => {
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval * 3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe("readFileAsynchronously", () => {
  const mockPathToFile = "test.txt";
  const mockFullPath = `/mock/__dirname/${mockPathToFile}`;

  beforeEach(() => {
    jest.clearAllMocks();
    (path.join as jest.Mock).mockReturnValue(mockFullPath);
  });
  test("should call join with pathToFile", async () => {
    await readFileAsynchronously(mockPathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, mockPathToFile);
  });

  test("should return null if file does not exist", async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBeNull();
    expect(fsPromises.readFile).not.toHaveBeenCalled();
  });

  test("should return file content if file exists", async () => {
    const mockContent = Buffer.from("Hello, world!");

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fsPromises.readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBe("Hello, world!");
    expect(fsPromises.readFile).toHaveBeenCalledWith(mockFullPath);
  });
});
