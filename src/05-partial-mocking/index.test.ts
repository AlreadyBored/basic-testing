import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

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
    const consoleLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const expectedValue = 'I am not mocked';
    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith(expectedValue);

    consoleSpy.mockRestore();
  });
});