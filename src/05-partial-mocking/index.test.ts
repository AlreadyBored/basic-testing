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
    mockOne();
    mockTwo();
    mockThree();
    expect(mockOne).not.toHaveBeenCalledWith(expect.anything());
    expect(mockTwo).not.toHaveBeenCalledWith(expect.anything());
    expect(mockThree).not.toHaveBeenCalledWith(expect.anything());
  }, 30000);

  test('unmockedFunction should log into console', () => {
    // console.log = jest.fn();
    // unmockedFunction();
    // expect(console.log).toHaveBeenCalledWith('I am not mocked');
    const spyOutput = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spyOutput).toHaveBeenCalledWith('I am not mocked');
    spyOutput.mockRestore();
  }, 30000);
});