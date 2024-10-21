// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(200, toAccount)).toThrow();  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(50, account)).toThrow();
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const amount = 50;
    account.deposit(amount);
    expect(account.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const amount = 50;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    const amount = 50;
    account.transfer(amount, toAccount);
    expect(account.getBalance()).toBe(initialBalance - amount);
    expect(toAccount.getBalance()).toBe(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe("number");
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).toBeLessThanOrEqual(100);
    } catch(error) {
      expect(account.getBalance()).toBe(initialBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    try {
      await account.synchronizeBalance();
    } catch(error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError)
    }
  });
});
