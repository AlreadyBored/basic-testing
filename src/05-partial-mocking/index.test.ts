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
    jest.spyOn(console, 'log').mockImplementation(() => jest.fn());

    mockOne();
    mockTwo();
    mockThree();

    expect(console.log).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const jestSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => jest.fn());

    unmockedFunction();
    expect(jestSpy).toBeCalled();

    jestSpy.mockRestore();
  });
});
