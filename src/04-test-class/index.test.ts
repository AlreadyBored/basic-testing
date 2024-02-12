import { getBankAccount } from '.';
// import * as lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 1000;

  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(1001)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountA = getBankAccount(initialBalance);
    const accountB = getBankAccount(initialBalance);
    expect(() => accountA.transfer(1001, accountB)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(100, account)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(initialBalance);
    account.deposit(1);
    expect(account.getBalance()).toBe(1001);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(initialBalance);
    account.withdraw(1);
    expect(account.getBalance()).toBe(999);
  });

  test('should transfer money', () => {
    const accountA = getBankAccount(initialBalance);
    const accountB = getBankAccount(initialBalance);
    accountA.transfer(1, accountB);
    expect(accountA.getBalance()).toBe(999);
    expect(accountB.getBalance()).toBe(1001);
  });

  test('fetchBalance should return a number in case if the request did not fail', async () => {
    const account = getBankAccount(initialBalance);

    const balance = await account.fetchBalance();

    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set a new balance if fetchBalance returned a number', async () => {
    const account = getBankAccount(initialBalance);
    account.fetchBalance = jest.fn().mockResolvedValue(150);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(150);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initialBalance);
    account.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      'Synchronization failed',
    );
  });
});
