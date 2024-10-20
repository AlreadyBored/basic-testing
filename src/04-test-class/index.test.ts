import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => jest.restoreAllMocks());

  test('should create account with initial balance', () => {
    expect(getBankAccount(10).getBalance()).toEqual(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(10).withdraw(11)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(10).transfer(11, getBankAccount(0))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(42);

    expect(() => account.transfer(1, account)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(getBankAccount(10).deposit(10).getBalance()).toEqual(20);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(10).withdraw(10).getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const [account, secondAccount] = [getBankAccount(42), getBankAccount(0)];
    account.transfer(7, secondAccount);
    expect([account.getBalance(), secondAccount.getBalance()]).toEqual([35, 7]);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(42).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();

    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(42).mockReturnValueOnce(1);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(42);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(42).mockReturnValueOnce(0);

    await expect(account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });
});
