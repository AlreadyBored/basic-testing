import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10_000;

    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(10000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 10_000;
    const withdrawAmount = 10_001;

    const account = getBankAccount(initialBalance);

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account.withdraw(withdrawAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${10000}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const senderBalance = 10_000;
    const sender = getBankAccount(senderBalance);

    const receiverBalance = 20_000;
    const receiver = getBankAccount(receiverBalance);

    const transferAmount = 10_001;

    expect(() => sender.transfer(transferAmount, receiver)).toThrow(
      InsufficientFundsError,
    );
    expect(() => sender.transfer(transferAmount, receiver)).toThrow(
      `Insufficient funds: cannot withdraw more than ${10000}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const senderBalance = 10_000;
    const sender = getBankAccount(senderBalance);

    const transferAmount = 10_001;

    expect(() => sender.transfer(transferAmount, sender)).toThrow(
      TransferFailedError,
    );
    expect(() => sender.transfer(transferAmount, sender)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const initialBalance = 10_000;

    const account = getBankAccount(initialBalance);

    const depositAmount = 2_345;

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(12_345);
  });

  test('should withdraw money', () => {
    const initialBalance = 10_000;

    const account = getBankAccount(initialBalance);

    const withdrawAmount = 124;

    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(9_876);
  });

  test('should transfer money', () => {
    const senderBalance = 10_000;
    const sender = getBankAccount(senderBalance);

    const receiverBalance = 20_000;
    const receiver = getBankAccount(receiverBalance);

    const transferAmount = 3_456;

    sender.transfer(transferAmount, receiver);

    expect(sender.getBalance()).toBe(6_544);
    expect(receiver.getBalance()).toBe(23_456);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockedRandom = lodash.random as jest.Mock;

    mockedRandom.mockReturnValueOnce(123).mockReturnValueOnce(1);

    const initialBalance = 0;

    const account = getBankAccount(initialBalance);

    const balance = await account.fetchBalance();

    expect(balance).toBe(123);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockedRandom = lodash.random as jest.Mock;

    mockedRandom.mockReturnValueOnce(456).mockReturnValueOnce(1);

    const initialBalance = 0;

    const account = getBankAccount(initialBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(456);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockedRandom = lodash.random as jest.Mock;

    mockedRandom.mockReturnValueOnce(789).mockReturnValueOnce(0);

    const initialBalance = 0;

    const account = getBankAccount(initialBalance);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
