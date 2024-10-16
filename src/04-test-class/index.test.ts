import { BankAccount, getBankAccount } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const bankAccount = getBankAccount(25);
  const transferBankAccount = getBankAccount(40);

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(25);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', async () => {
    await expect(async () => bankAccount.withdraw(30)).rejects.toThrow(
      `Insufficient funds: cannot withdraw more than ${bankAccount.getBalance()}`,
    );
  });

  test('should throw error when transferring more than balance', async () => {
    const amount = 30;
    await expect(async () =>
      bankAccount.transfer(amount, transferBankAccount),
    ).rejects.toThrow(
      `Insufficient funds: cannot withdraw more than ${bankAccount.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', async () => {
    await expect(async () =>
      bankAccount.transfer(30, bankAccount),
    ).rejects.toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    bankAccount.deposit(5);
    expect(bankAccount.getBalance()).toBe(30);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(5);
    expect(bankAccount.getBalance()).toBe(25);
  });

  test('should transfer money', () => {
    bankAccount.transfer(20, transferBankAccount);
    expect(bankAccount.getBalance()).toBe(5);
    expect(transferBankAccount.getBalance()).toBe(60);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => 1);

    expect(await bankAccount.fetchBalance()).not.toBeNull();

    jest.resetAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockImplementation(async () => 100);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(100);

    jest.resetAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(async () => null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );

    jest.resetAllMocks();
  });
});
