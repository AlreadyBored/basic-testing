import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(() => undefined),
    mockTwo: jest.fn(() => undefined),
    mockThree: jest.fn(() => undefined),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    unmockedFunction();

    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
