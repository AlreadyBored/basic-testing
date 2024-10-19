// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  const bankedAmount1 = 100;
  const bankedAmount2 = 200;
  let account1: BankAccount;
  let account2: BankAccount;

  beforeEach(() => {
    account1 = getBankAccount(bankedAmount1);
    account2 = getBankAccount(bankedAmount2);
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(bankedAmount1).getBalance()).toBe(bankedAmount1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account1.withdraw(bankedAmount1 + 1)).toThrow(
      `Insufficient funds: cannot withdraw more than ${bankedAmount1}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account1.withdraw(bankedAmount1 + 1)).toThrow(
      `${bankedAmount1}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account1.transfer(bankedAmount1, account1)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    expect(account1.deposit(bankedAmount1).getBalance()).toBe(
      bankedAmount1 + bankedAmount1,
    );
  });

  test('should withdraw money', () => {
    expect(account1.withdraw(bankedAmount1).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    account1.transfer(bankedAmount1, account2);

    expect(account2.getBalance()).toBe(bankedAmount1 + bankedAmount2);
    expect(account1.getBalance()).toBe(0);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(bankedAmount1);
    expect(await account1.fetchBalance()).toBe(bankedAmount1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(bankedAmount1);
    await account1.synchronizeBalance();
    expect(account1.getBalance()).toBe(bankedAmount1);
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(bankedAmount2);
    await account1.synchronizeBalance();
    expect(account1.getBalance()).toBe(bankedAmount2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(null);
    expect(account1.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
