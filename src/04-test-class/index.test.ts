// Uncomment the code below and write your tests
import {
  getBankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const bankAccountFrom = getBankAccount(initialBalance);
    const bankAccountTo = getBankAccount(0);
    expect(() => bankAccountFrom.transfer(200, bankAccountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.transfer(50, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.deposit(10).getBalance()).toEqual(initialBalance + 10);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.withdraw(10).getBalance()).toEqual(initialBalance - 10);
  });

  test('should transfer money', () => {
    const initialBalanceFrom = 100;
    const initialBalanceTo = 0;
    const bankAccountFrom = getBankAccount(initialBalanceFrom);
    const bankAccountTo = getBankAccount(initialBalanceTo);
    bankAccountFrom.transfer(10, bankAccountTo);
    expect(bankAccountFrom.getBalance()).toEqual(initialBalanceFrom - 10);
    expect(bankAccountTo.getBalance()).toEqual(initialBalanceTo + 10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    jest.unmock('lodash');
    lodash.random = jest.fn(() => 1);
    const fetchedBalance = await bankAccount.fetchBalance();
    const typeOfFetchedBalance = typeof fetchedBalance;
    expect(typeOfFetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(10).mockReturnValueOnce(1);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(10).mockReturnValueOnce(0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
