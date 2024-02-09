// Uncomment the code below and write your tests

import * as lodash from 'lodash';
import { BankAccount, getBankAccount } from './index';
jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const initialBalance = 100;
  const amountOfMoney = 50;
  let bankAccount: BankAccount;
  const mockedRandom = lodash.random as jest.Mock;

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() =>
      bankAccount.withdraw(initialBalance + amountOfMoney),
    ).toThrowError(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(
        initialBalance + amountOfMoney,
        getBankAccount(amountOfMoney),
      ),
    ).toThrowError(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      bankAccount.transfer(initialBalance, bankAccount),
    ).toThrowError(`Transfer failed`);
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(amountOfMoney).getBalance()).toBe(
      initialBalance + amountOfMoney,
    );
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(amountOfMoney).getBalance()).toBe(
      amountOfMoney,
    );
  });

  test('should transfer money', () => {
    expect(
      bankAccount
        .transfer(amountOfMoney, getBankAccount(amountOfMoney))
        .getBalance(),
    ).toBe(amountOfMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    mockedRandom
      .mockImplementationOnce(() => amountOfMoney)
      .mockImplementationOnce(() => 1);
    const result = await bankAccount.fetchBalance();

    expect(result).toBe(amountOfMoney);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    mockedRandom
      .mockImplementationOnce(() => amountOfMoney)
      .mockImplementationOnce(() => 1);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(amountOfMoney);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    mockedRandom
      .mockImplementationOnce(() => amountOfMoney)
      .mockImplementationOnce(() => 0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      'Synchronization failed',
    );
  });
});
