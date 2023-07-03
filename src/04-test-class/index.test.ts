// Uncomment the code below and write your tests
import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1);
    expect(account.getBalance()).toBe(1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1);
    expect(() => account.withdraw(2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1);
    const account2 = getBankAccount(2);
    expect(() => account.transfer(3, account2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1);
    expect(() => account.transfer(3, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1);
    account.deposit(2);
    expect(account.getBalance()).toBe(3);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(3);
    expect(account.withdraw(2).getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const account = getBankAccount(5);
    const account2 = getBankAccount(1);
    account.transfer(3, account2);
    expect(account.getBalance()).toBe(2);
    expect(account2.getBalance()).toBe(4);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1);
    const o = await account.fetchBalance();
    if (o !== null) {
      expect(typeof o).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1);
    const newBalance = 2;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(newBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.hasAssertions();
    const account = getBankAccount(1);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
