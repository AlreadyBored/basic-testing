import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

const initialBalance = 1000;
const balance = 100;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(initialBalance);

    expect(() => account.withdraw(10000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);

    expect(() => account1.transfer(10000, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(initialBalance);

    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(initialBalance);
    const depositAmount = 100;

    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(initialBalance);
    const withdrawAmount = 100;

    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);
    const transferAmount = 100;

    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(initialBalance - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(initialBalance);
    const balance = 100;
    const requestSucceeded = 1;

    (random as jest.Mock)
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(requestSucceeded);
    await expect(account.fetchBalance()).resolves.toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(initialBalance);
    const requestSucceeded = 1;

    (random as jest.Mock)
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(requestSucceeded);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initialBalance);
    const requestFailed = 0;

    (random as jest.Mock)
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(requestFailed);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(account.getBalance()).toBe(initialBalance);
  });
});
