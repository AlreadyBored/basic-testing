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
    const logSpy = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).toBeCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(logSpy).toBeCalledWith('I am not mocked');
  });
});
