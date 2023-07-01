// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1000);
    const toAccount = getBankAccount(1000);

    expect(() => account.transfer(2000, toAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);

    expect(() => account.transfer(500, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);

    expect(account.deposit(1000).getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(2000);

    expect(account.withdraw(1000).getBalance()).toBe(1000);
  });

  test('should transfer money', () => {
    const account = getBankAccount(2000);
    const toAccount = getBankAccount(1000);
    account.transfer(1000, toAccount);

    expect(account.getBalance()).toBe(1000);
    expect(toAccount.getBalance()).toBe(2000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(2000);
    const result = await account.fetchBalance();

    if (result !== null) {
      expect(typeof result).toBe('number');
    } else {
      expect(result).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(2000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(1000);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(2000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(
      async () => await account.synchronizeBalance(),
    ).rejects.toThrow(SynchronizationFailedError);
  });
});
