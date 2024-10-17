// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => null,
    mockTwo: () => null,
    mockThree: () => null,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne()).toBeNull();
    expect(mockTwo()).toBeNull();
    expect(mockThree()).toBeNull();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    unmockedFunction();

    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
