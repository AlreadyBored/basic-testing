// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const balance = 1;
    const bankAccount = getBankAccount(balance);

    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(1).withdraw(2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(1).transfer(2, getBankAccount(1))).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(2);
    expect(() => bankAccount.transfer(1, bankAccount)).toThrow();
  });

  test('should deposit money', () => {
    const balance = 1;
    const deposit = 2;
    const bankAccount = getBankAccount(balance);
    bankAccount.deposit(deposit);

    expect(bankAccount.getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 2;
    const withdraw = 1;
    const bankAccount = getBankAccount(balance);
    bankAccount.withdraw(withdraw);

    expect(bankAccount.getBalance()).toBe(balance - withdraw);
  });

  test('should transfer money', () => {
    const senderBalance = 10;
    const recipientBalance = 20;
    const transfer = 5;

    const senderAccount = getBankAccount(senderBalance);
    const recipientAccount = getBankAccount(recipientBalance);
    senderAccount.transfer(transfer, recipientAccount);

    expect(senderAccount.getBalance() + transfer).toBe(senderBalance);
    expect(recipientAccount.getBalance() - transfer).toBe(recipientBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockRandom = jest.spyOn(lodash, 'random');
    mockRandom.mockReturnValue(1);

    return expect(getBankAccount(1).fetchBalance()).resolves.toEqual(
      expect.any(Number),
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockedBalance = 42;

    const mockRandom = jest.spyOn(lodash, 'random');
    mockRandom.mockReturnValue(1).mockReturnValueOnce(mockedBalance);

    const bankAccount = getBankAccount(1);

    try {
      await bankAccount.synchronizeBalance();
    } catch {}

    expect(bankAccount.getBalance()).toBe(mockedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockRandom = jest.spyOn(lodash, 'random');
    mockRandom.mockReturnValue(0);

    return expect(getBankAccount(1).synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
