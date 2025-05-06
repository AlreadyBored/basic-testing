// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  return {
    ...jest.requireActual<typeof import('./index')>('./index'),
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
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    mockOne();
    mockTwo();
    mockThree();

    expect(console.log).not.toHaveBeenCalledWith('foo');
    expect(console.log).not.toHaveBeenCalledWith('bar');
    expect(console.log).not.toHaveBeenCalledWith('baz');

    consoleLogSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    unmockedFunction();
    expect(console.log).toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });
});
