import _ from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));
const randomMock = jest.mocked(_.random);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);
    expect(() => bankAccount.withdraw(balance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);
    const anotherBankAccount = getBankAccount(0);
    expect(() =>
      bankAccount.transfer(balance + 1, anotherBankAccount),
    ).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);
    expect(() => bankAccount.transfer(1, bankAccount)).toThrow();
  });

  test('should deposit money', () => {
    const initialBalance = 0;
    const amount = 10;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(amount);
    expect(bankAccount.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 50;
    const amount = 20;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(amount);
    expect(bankAccount.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const initialSenderBalance = 50;
    const initialReceiverBalance = 10;
    const amount = 20;
    const bankAccount = getBankAccount(initialSenderBalance);
    const anotherBankAccount = getBankAccount(initialReceiverBalance);
    bankAccount.transfer(amount, anotherBankAccount);
    expect(anotherBankAccount.getBalance()).toBe(
      initialReceiverBalance + amount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    randomMock.mockReturnValue(1);
    const bankAccount = getBankAccount(100);
    const fetchedBalance = await bankAccount.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 123;
    const mockedBankAccount = getBankAccount(0);
    jest
      .spyOn(mockedBankAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(balance));
    await mockedBankAccount.synchronizeBalance();
    expect(mockedBankAccount.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockedBankAccount = getBankAccount(0);
    jest
      .spyOn(mockedBankAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(null));
    expect(
      async () => await mockedBankAccount.synchronizeBalance(),
    ).rejects.toThrow(SynchronizationFailedError);
  });
});
