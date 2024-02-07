import _ from 'lodash';

import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 45000;
  const randomAmount = Math.round(Math.random() * 10000);
  let mainAccount: BankAccount;
  let secondaryAccount: BankAccount;

  beforeAll(() => {
    mainAccount = getBankAccount(initialBalance);
    secondaryAccount = getBankAccount(0);
  });

  beforeEach(() => {
    jest.resetModules();
  });

  test('should create account with initial balance', () => {
    expect(mainAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      mainAccount.withdraw(50000);
    } catch (err) {
      expect(err).toBeInstanceOf(InsufficientFundsError);
      expect((err as InsufficientFundsError).message).toEqual(
        `Insufficient funds: cannot withdraw more than ${initialBalance}`,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      mainAccount.transfer(50000, secondaryAccount);
    } catch (err) {
      expect(err).toBeInstanceOf(InsufficientFundsError);
      expect((err as InsufficientFundsError).message).toEqual(
        `Insufficient funds: cannot withdraw more than ${initialBalance}`,
      );
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      mainAccount.transfer(1, mainAccount);
    } catch (err) {
      expect(err).toBeInstanceOf(TransferFailedError);
      expect((err as TransferFailedError).message).toEqual('Transfer failed');
    }
  });

  test('should deposit money', () => {
    mainAccount.deposit(randomAmount);

    expect(mainAccount.getBalance()).toEqual(initialBalance + randomAmount);
  });

  test('should withdraw money', () => {
    mainAccount.withdraw(randomAmount);

    expect(mainAccount.getBalance()).toEqual(initialBalance);
  });

  test('should transfer money', () => {
    mainAccount.transfer(randomAmount, secondaryAccount);

    expect(mainAccount.getBalance()).toEqual(initialBalance - randomAmount);
    expect(secondaryAccount.getBalance()).toEqual(randomAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const originalLodashRandom = _.random;

    _.random = () => randomAmount;

    const fetchBalanceResult = await mainAccount.fetchBalance();

    expect(fetchBalanceResult).toEqual(randomAmount);

    _.random = originalLodashRandom;
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const originalLodashRandom = _.random;

    _.random = () => randomAmount;

    await mainAccount.synchronizeBalance();

    expect(mainAccount.getBalance()).toEqual(randomAmount);

    _.random = originalLodashRandom;
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const originalLodashRandom = _.random;

    _.random = () => 0;

    try {
      await mainAccount.synchronizeBalance();
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
      expect((err as SynchronizationFailedError).message).toEqual(
        'Synchronization failed',
      );
    } finally {
      _.random = originalLodashRandom;
    }
  });
});
