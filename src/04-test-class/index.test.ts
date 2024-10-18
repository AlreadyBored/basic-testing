import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

const INITIAL_BALANCE_ACCOUNT_1 = 100;
const INITIAL_BALANCE_ACCOUNT_2 = 50;
const INSUFFICIENT_BALANCE = 200;
const TRANSFER_AMOUNT = 50;
const EXCEPTION_TRANSFER_AMOUNT = 100;
const FETCH_BALANCE_SUCCESS = 75;
const FETCH_BALANCE_NULL = null;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    expect(account.getBalance()).toBe(INITIAL_BALANCE_ACCOUNT_1);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_2);
    expect(() => account.withdraw(EXCEPTION_TRANSFER_AMOUNT)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw TransferFailedError when transferring to the same account', () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    expect(() => account.transfer(TRANSFER_AMOUNT, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should throw InsufficientFundsError when transferring more than balance', () => {
    const firstAccount = getBankAccount(INITIAL_BALANCE_ACCOUNT_2);
    const secondAccount = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    expect(() =>
      firstAccount.transfer(EXCEPTION_TRANSFER_AMOUNT, secondAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    account.deposit(TRANSFER_AMOUNT);
    expect(account.getBalance()).toBe(
      INITIAL_BALANCE_ACCOUNT_1 + TRANSFER_AMOUNT,
    );
  });

  test('should withdraw money', () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    account.withdraw(TRANSFER_AMOUNT);
    expect(account.getBalance()).toBe(
      INITIAL_BALANCE_ACCOUNT_1 - TRANSFER_AMOUNT,
    );
  });

  test('should transfer money between accounts', () => {
    const firstAccount = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    const secondAccount = getBankAccount(INITIAL_BALANCE_ACCOUNT_2);
    firstAccount.transfer(TRANSFER_AMOUNT, secondAccount);
    expect(firstAccount.getBalance()).toBe(
      INITIAL_BALANCE_ACCOUNT_1 - TRANSFER_AMOUNT,
    );
    expect(secondAccount.getBalance()).toBe(
      INITIAL_BALANCE_ACCOUNT_2 + TRANSFER_AMOUNT,
    );
  });

  test('fetchBalance should return number if request did not fail', async () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    (random as jest.Mock).mockReturnValueOnce(FETCH_BALANCE_SUCCESS);

    const balance = await account.fetchBalance();
    expect(balance).toBe(FETCH_BALANCE_SUCCESS);
  });

  test('should set new balance if fetchBalance returned a number', async () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValueOnce(INSUFFICIENT_BALANCE);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(INSUFFICIENT_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(INITIAL_BALANCE_ACCOUNT_1);
    jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValueOnce(FETCH_BALANCE_NULL);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
