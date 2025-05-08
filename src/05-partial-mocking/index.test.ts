import * as mockedModule from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockedModule.mockOne();
    mockedModule.mockTwo();
    mockedModule.mockThree();

    expect(mockedModule.mockOne).toHaveBeenCalled();
    expect(mockedModule.mockTwo).toHaveBeenCalled();
    expect(mockedModule.mockThree).toHaveBeenCalled();

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockedModule.unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
    consoleSpy.mockRestore();
  });
});
