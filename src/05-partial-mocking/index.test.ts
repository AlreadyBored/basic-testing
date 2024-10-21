// Uncomment the code below and write your tests
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

    expect(consoleLog).not.toHaveBeenCalledWith('foo');
    expect(consoleLog).not.toHaveBeenCalledWith('bar');
    expect(consoleLog).not.toHaveBeenCalledWith('baz');

    consoleLog.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');

    unmockedFunction();
    expect(consoleLog).toHaveBeenCalledWith('I am not mocked');

    consoleLog.mockRestore();
  });
});
