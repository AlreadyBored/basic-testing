import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

jest.unmock('lodash');
import _ from 'lodash';

let newBankAccount: BankAccount;
beforeEach(() => {
  newBankAccount = getBankAccount(100);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(newBankAccount).toStrictEqual(new BankAccount(100));
    expect(newBankAccount).toHaveProperty('_balance');
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = newBankAccount.getBalance();
    expect(() => newBankAccount.withdraw(110)).toThrowError(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const otherBankAccount = getBankAccount(5000);
    expect(() => newBankAccount.transfer(110, otherBankAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => newBankAccount.transfer(110, newBankAccount)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const prevBalance = newBankAccount.getBalance();
    newBankAccount.deposit(100);
    expect(newBankAccount.getBalance()).toEqual(prevBalance + 100);
  });

  test('should withdraw money', () => {
    const prevBalance = newBankAccount.getBalance();
    newBankAccount.withdraw(50);
    expect(newBankAccount.getBalance()).toEqual(prevBalance - 50);
  });

  test('should transfer money', () => {
    const otherBankAccount = getBankAccount(5000);
    const otherBankAccountPrevBalance = otherBankAccount.getBalance();

    const prevBalance = newBankAccount.getBalance();

    newBankAccount.transfer(50, otherBankAccount);

    expect(newBankAccount.getBalance()).toEqual(prevBalance - 50);
    expect(otherBankAccount.getBalance()).toEqual(
      otherBankAccountPrevBalance + 50,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    _.random = jest.fn(() => 1);
    const balance = await newBankAccount.fetchBalance();
    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    _.random = jest.fn(() => 1);
    await newBankAccount.synchronizeBalance();

    expect(newBankAccount.getBalance()).toEqual(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    _.random = jest.fn(() => 0);

    expect(
      async () => await newBankAccount.synchronizeBalance(),
    ).rejects.toThrowError(new SynchronizationFailedError());
  });
});
