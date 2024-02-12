import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModules: true,
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
    const logFunction = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(logFunction).toBeCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const logFunction = jest.spyOn(console, 'log');
    mockOne();
    unmockedFunction();
    expect(logFunction).toBeCalledTimes(1);
    unmockedFunction();
    expect(logFunction).toBeCalledWith('I am not mocked');
  });
});
