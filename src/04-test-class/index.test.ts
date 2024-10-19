import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(150)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(200);
    expect(() => account1.transfer(150, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);
    account1.transfer(30, account2);
    expect(account1.getBalance()).toBe(70);
    expect(account2.getBalance()).toBe(80);
  });

  test('fetchBalance should return number if request did not fail', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = async () => 80;
    const balance = await account.fetchBalance();
    expect(balance).toBe(80);
  });

  test('fetchBalance should return null if the request failed', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = async () => null;
    const balance = await account.fetchBalance();
    expect(balance).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = async () => 70;
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(70);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = async () => null;
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
