import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  let account: BankAccount;
  let targetAccount: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
    targetAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(1000);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      account.transfer(1000, targetAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(1000, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const amount = 10;

    expect(account.deposit(10).getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const amount = 10;

    expect(account.withdraw(10).getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const amount = 10;

    account.transfer(amount, targetAccount);

    expect(account.getBalance()).toBe(initialBalance - amount);
    expect(targetAccount.getBalance()).toBe(initialBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
