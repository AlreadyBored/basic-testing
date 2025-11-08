import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(100).withdraw(101)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(100).transfer(101, getBankAccount(100)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(getBankAccount(100).deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(100).withdraw(100).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    expect(
      getBankAccount(100).transfer(100, getBankAccount(100)).getBalance(),
    ).toBe(0);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    expect(await account.fetchBalance()).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
