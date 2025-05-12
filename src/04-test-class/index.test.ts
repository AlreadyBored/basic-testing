// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let account: BankAccount;
  let account2: BankAccount;
  beforeEach(() => {
    account = getBankAccount(1000);
    account2 = getBankAccount(500);
  });
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(account['_balance']);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(account.getBalance() + 10);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      account.transfer(account.getBalance() + 10, account2);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(100, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(100);
    expect(account.getBalance()).toBe(1100);
  });

  test('should withdraw money', () => {
    account.withdraw(100);
    expect(account.getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    account.transfer(100, account2);
    expect(account.getBalance()).toBe(900);
    expect(account2.getBalance()).toBe(600);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(1);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(999).mockReturnValueOnce(0);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
