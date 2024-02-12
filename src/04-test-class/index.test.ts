// Uncomment the code below and write your tests
import lodash, { random } from 'lodash';

import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialMainBalance = 100;
  const initialTransferBalance = 50;
  const mainAcc = new BankAccount(initialMainBalance);
  const transferAcc = new BankAccount(initialTransferBalance);
  const mainAccBalance = mainAcc.getBalance();
  const transferAccBalance = transferAcc.getBalance();

  const initialRandom = random;

  beforeEach(() => {
    lodash.random = initialRandom;
  });

  jest.unmock('lodash');

  test('should create mainAcc with initial balance', () => {
    expect(getBankAccount(initialMainBalance)).toEqual(mainAcc);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => mainAcc.withdraw(mainAccBalance + 50)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      transferAcc.transfer(transferAccBalance + 50, mainAcc),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same mainAcc', () => {
    expect(() => transferAcc.transfer(transferAccBalance, transferAcc)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(mainAcc.deposit(50)).toEqual(mainAcc);
  });

  test('should withdraw money', () => {
    expect(mainAcc.withdraw(mainAccBalance)).toEqual(mainAcc);
  });

  test('should transfer money', () => {
    expect(transferAcc.transfer(transferAccBalance, mainAcc)).toEqual(
      transferAcc,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const response = await mainAcc.fetchBalance();
    response !== null && expect(response).not.toBeNaN();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 5);
    await mainAcc.synchronizeBalance();
    expect(mainAcc.getBalance()).toBe(5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);
    await expect(mainAcc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
