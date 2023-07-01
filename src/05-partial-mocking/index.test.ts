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
    // Write your test here
    const consoleLogSpy = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    const consoleLogSpy = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
