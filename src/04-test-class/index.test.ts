// Uncomment the code below and write your tests
// import { getBankAccount } from '.';

import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '04-test-class';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountA = getBankAccount(30);
    const accountB = getBankAccount(10);

    expect(() => accountA.transfer(50, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(10, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(30);
    expect(account.getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    const accountA = getBankAccount(200);
    const accountB = getBankAccount(50);

    accountA.transfer(100, accountB);

    expect(accountA.getBalance()).toBe(100);
    expect(accountB.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(42);
    const result = await account.fetchBalance();
    expect(result).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(77);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(77);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    const promise = account.synchronizeBalance();

    await expect(promise).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(promise).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
