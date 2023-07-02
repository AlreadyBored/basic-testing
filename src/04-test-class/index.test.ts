import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './';

const lodash = jest.requireActual('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawalAmount = 200;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(withdrawalAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const transferAmount = 200;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(0);
    expect(() => account1.transfer(transferAmount, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 50;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawalAmount = 50;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 100;
    const initialBalance2 = 0;
    const transferAmount = 50;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);
    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(200);
    lodash.random = jest.fn(() => 2);
    const result = await account.fetchBalance();
    expect(result).toEqual(2);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const newBalance = 50;
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(newBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});