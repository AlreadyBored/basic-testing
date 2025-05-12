import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);
    const insufficientError = new InsufficientFundsError(10);

    expect(() => bankAccount.withdraw(15)).toThrow(insufficientError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    const insufficientError = new InsufficientFundsError(10);

    expect(() => bankAccount.transfer(15, toAccount)).toThrow(
      insufficientError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.transfer(10, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount.deposit(10).getBalance()).toBe(20);
  });

  test('should withdraw money', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount.withdraw(10).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);

    expect(bankAccount.transfer(10, toAccount).getBalance()).toBe(0);
  });

  // CHECK
  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    const balance = await bankAccount.fetchBalance();
    if (balance) {
      await expect(bankAccount.getBalance()).toBe(balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    const balance = await bankAccount.fetchBalance();

    if (!balance) {
      await expect(() => bankAccount.synchronizeBalance).toThrow(
        SynchronizationFailedError,
      );
    }
  });
});
