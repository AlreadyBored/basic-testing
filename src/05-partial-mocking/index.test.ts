import { mockOne, mockTwo, mockThree } from './index';
import * as index from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    unmockedFunction: jest.fn(originalModule.unmockedFunction),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    (mockOne as jest.Mock).mockClear();
    (mockTwo as jest.Mock).mockClear();
    (mockThree as jest.Mock).mockClear();
    expect(mockOne).not.toHaveBeenCalled();
    expect(mockTwo).not.toHaveBeenCalled();
    expect(mockThree).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    index.unmockedFunction();
    expect(index.unmockedFunction).toHaveBeenCalled();
  });
});
