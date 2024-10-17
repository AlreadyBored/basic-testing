import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let consoleLog: jest.SpyInstance;

  beforeEach(() => {
    consoleLog = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    consoleLog.mockRestore();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(consoleLog).toHaveBeenCalled();
    expect(consoleLog).toHaveBeenCalledTimes(1);
    expect(consoleLog).toHaveBeenCalledWith('I am not mocked');
  });
});

