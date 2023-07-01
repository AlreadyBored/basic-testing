import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);

    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account1 = new BankAccount(initialBalance);
    const account2 = new BankAccount(0);

    expect(() => account1.transfer(200, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);

    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const amount = 50;

    account.deposit(amount);

    expect(account.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const amount = 50;

    account.withdraw(amount);

    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 100;
    const initialBalance2 = 0;
    const account1 = new BankAccount(initialBalance1);
    const account2 = new BankAccount(initialBalance2);
    const amount = 50;

    account1.transfer(amount, account2);

    expect(account1.getBalance()).toBe(initialBalance1 - amount);
    expect(account2.getBalance()).toBe(initialBalance2 + amount);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = new BankAccount(0);
    const result = await account.fetchBalance();

    typeof result === 'number' && expect(typeof result).toEqual('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(0);
    const balance = 100;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
