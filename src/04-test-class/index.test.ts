// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';
import { InsufficientFundsError } from './index';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

const mockedRandom = random as unknown as jest.Mock;

afterEach(() => {
  jest.restoreAllMocks();
  mockedRandom.mockReset();
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const from = getBankAccount(50);
    const to = getBankAccount(0);
    expect(() => from.transfer(60, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(50);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(10, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    const returned = account.deposit(30);
    expect(account.getBalance()).toBe(130);
    expect(returned).toBe(account);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    const returned = account.withdraw(40);
    expect(account.getBalance()).toBe(60);
    expect(returned).toBe(account);
  });

  test('should transfer money', () => {
    const from = getBankAccount(100);
    const to = getBankAccount(10);

    const returned = from.transfer(35, to);

    expect(from.getBalance()).toBe(65);
    expect(to.getBalance()).toBe(45);
    expect(returned).toBe(from);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);

    mockedRandom.mockReturnValueOnce(45).mockReturnValueOnce(1);
    const result = await account.fetchBalance();
    expect(result).toBe(45);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);

    jest.spyOn(BankAccount.prototype, 'fetchBalance').mockResolvedValue(77);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(77);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);

    jest.spyOn(BankAccount.prototype, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
