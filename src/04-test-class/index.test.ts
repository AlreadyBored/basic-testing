// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const amountToModify = 100;
const initialBalance = 1000;
const additionalBalance = 2000;
const initialBankAccount = getBankAccount(initialBalance);
const additionalBankAccount = getBankAccount(additionalBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(initialBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const exceedingWithdrawal = () =>
      initialBankAccount.withdraw(initialBalance + amountToModify);

    expect(exceedingWithdrawal).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const exceedingTransfer = () =>
      initialBankAccount.transfer(
        initialBalance + amountToModify,
        additionalBankAccount,
      );

    expect(exceedingTransfer).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const wrongTransfer = () =>
      initialBankAccount.transfer(
        initialBalance + amountToModify,
        initialBankAccount,
      );

    expect(wrongTransfer).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    initialBankAccount.deposit(amountToModify);
    const initialBalanceUpdated = initialBankAccount.getBalance();

    expect(initialBalanceUpdated).toBe(initialBalance + amountToModify);
  });

  test('should withdraw money', () => {
    initialBankAccount.withdraw(amountToModify);
    const initialBalanceUpdated = initialBankAccount.getBalance();

    expect(initialBalanceUpdated).toBe(initialBalance);
  });

  test('should transfer money', () => {
    initialBankAccount.transfer(amountToModify, additionalBankAccount);
    const initialBalanceUpdated = initialBankAccount.getBalance();
    const additionalBalanceUpdated = additionalBankAccount.getBalance();

    expect(initialBalanceUpdated).toBe(initialBalance - amountToModify);
    expect(additionalBalanceUpdated).toBe(additionalBalance + amountToModify);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = await initialBankAccount.fetchBalance();

    if (fetchedBalance === null) {
      expect(fetchedBalance).toBe(null);
    } else {
      expect(typeof fetchedBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(initialBankAccount, 'fetchBalance')
      .mockResolvedValue(amountToModify);

    await initialBankAccount.synchronizeBalance();

    expect(initialBankAccount.getBalance()).toBe(amountToModify);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(initialBankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(initialBankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
