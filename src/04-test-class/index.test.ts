import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';
jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(101);
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toStrictEqual(101);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(101);
    expect(() => account.withdraw(201)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(101);
    expect(() => account.transfer(201, getBankAccount(101))).toThrow(
      new InsufficientFundsError(101),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(101);
    expect(() => account.transfer(201, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(101);
    expect(account.deposit(10).getBalance()).toStrictEqual(111);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(101);
    expect(account.withdraw(10).getBalance()).toStrictEqual(91);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(101);
    const account2 = getBankAccount(10);
    account1.transfer(10, account2);
    expect(account1.getBalance()).toStrictEqual(91);
    expect(account2.getBalance()).toStrictEqual(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(50);
    (random as jest.Mock).mockReturnValueOnce(1);
    const account = getBankAccount(101);
    expect(await account.fetchBalance()).toStrictEqual(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(90);
    (random as jest.Mock).mockReturnValueOnce(1);
    const account = getBankAccount(101);
    await account.synchronizeBalance();
    expect(account.getBalance()).toStrictEqual(90);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(101);
    const accountMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    accountMock.mockRestore();
  });
});
