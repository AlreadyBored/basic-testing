import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  const mockModule = {
    mockOne: jest.fn(() => true),
    mockTwo: jest.fn(() => true),
    mockThree: jest.fn(() => true),
    unmockedFunction: originalModule.unmockedFunction,
  };
  return mockModule;
});

describe('partial mocking', () => {
  let mockConsole: jest.SpyInstance;

  beforeEach(() => {
    mockConsole = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(mockConsole).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(mockConsole).toHaveBeenCalledTimes(1);
  });
});
