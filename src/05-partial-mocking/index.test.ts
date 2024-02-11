// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  const arrFn = [mockOne, mockTwo, mockThree];

  afterAll(() => {
    jest.unmock('./index');
  });

  test.each(arrFn)('mockOne, mockTwo, mockThree should not log into console', (fn: any) => {
    fn()
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('unmockedFunction should log into console', () => {
    const expectedMessage = 'I am not mocked';
    const consoleLogSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedMessage);
  });
});
