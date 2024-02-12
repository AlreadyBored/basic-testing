import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
    consoleLogSpy.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
