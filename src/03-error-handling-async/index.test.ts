import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const msg = 'Resolved value';
    expect.assertions(1);
    resolveValue(msg).then((data) => expect(data).toContain(msg));
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Custom error message';
    const throwErrorWithMessage = () => throwError(msg);

    expect(throwErrorWithMessage).toThrow(Error);
    expect(throwErrorWithMessage).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(Error);
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
