import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const firstBank = getBankAccount(10);

    expect(firstBank.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const firstBank = getBankAccount(10);

    expect(() => firstBank.withdraw(20)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const firstBank = getBankAccount(10);
    const secondBank = getBankAccount(0);

    expect(() => firstBank.transfer(20, secondBank)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const firstBank = getBankAccount(10);

    expect(() => firstBank.transfer(10, firstBank)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const firstBank = getBankAccount(10);

    expect(firstBank.deposit(10).getBalance()).toBe(20);
  });

  test('should withdraw money', () => {
    const firstBank = getBankAccount(10);

    expect(firstBank.withdraw(10).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const firstBank = getBankAccount(10);
    const secondBank = getBankAccount(0);

    expect(firstBank.transfer(10, secondBank).getBalance()).toBe(0);
    expect(secondBank.getBalance()).toBe(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const firstBank = getBankAccount(10);
    const result = await firstBank.fetchBalance();

    result == null
      ? expect(result).toBeNull()
      : expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const firstBank = getBankAccount(0);

    firstBank.fetchBalance = async () => 30;
    await firstBank.synchronizeBalance();
    expect(firstBank.getBalance()).toBe(30);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const firstBank = getBankAccount(0);

    firstBank.fetchBalance = async () => null;
    await expect(firstBank.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
