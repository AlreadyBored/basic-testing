import {
  BankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
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

    expect(() => account.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account1 = new BankAccount(initialBalance);
    const account2 = new BankAccount(initialBalance);

    expect(() => account1.transfer(initialBalance + 1, account2)).toThrow(
      InsufficientFundsError
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);

    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const depositAmount = 50;

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const withdrawalAmount = 50;

    account.withdraw(withdrawalAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 100;
    const initialBalance2 = 200;
    const account1 = new BankAccount(initialBalance1);
    const account2 = new BankAccount(initialBalance2);
    const transferAmount = 50;

    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = new BankAccount(0);
    const balance = await account.fetchBalance();
  
    const requestFailed: boolean = balance === null;
    if (requestFailed) {
      expect(balance).toBeNull();
    } else {
      expect(typeof balance).toBe('number');
    }
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
      SynchronizationFailedError
    );
  });
});
