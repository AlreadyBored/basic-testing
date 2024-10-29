import { random } from 'lodash';
jest.mock('lodash');
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
  BankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const money = 100;
    const account = getBankAccount(money);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(money);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    const amount = 120;

    expect(() => {
      account.withdraw(amount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const sender = getBankAccount(90);
    const receiver = getBankAccount(0);
    const amount = 120;

    expect(() => {
      sender.transfer(amount, receiver);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const money = 100;
    const account = getBankAccount(money);

    expect(() => {
      account.transfer(money, account);
    }).toThrow();
  });

  test('should deposit money', () => {
    const money = 100;
    const account = getBankAccount(money);
    const deposit = 20;

    expect(account.deposit(deposit).getBalance()).toBe(money + deposit);
  });

  test('should withdraw money', () => {
    const money = 100;
    const account = getBankAccount(money);
    const amount = 20;

    expect(account.withdraw(amount).getBalance()).toBe(money - amount);
  });

  test('should transfer money', () => {
    const money1 = 100;
    const account1 = getBankAccount(money1);
    const money2 = 100;
    const account2 = getBankAccount(money2);
    const amount = 20;

    expect(account1.transfer(amount, account2).getBalance()).toBe(
      money1 - amount,
    );
    expect(account2.getBalance()).toBe(money2 + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const money = 100;
    const account = getBankAccount(money);

    (random as jest.Mock).mockReturnValueOnce(money);

    const balance = await account.fetchBalance();
    expect(typeof balance === 'number').toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 100;
    const account = getBankAccount(0);
    const successResult = 1;

    (random as jest.Mock).mockReturnValueOnce(mockBalance);
    (random as jest.Mock).mockReturnValueOnce(successResult);

    const balance = await account.fetchBalance();

    expect(balance).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    account.fetchBalance = jest.fn(() => Promise.resolve(null));

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
