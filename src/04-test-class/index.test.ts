import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const bankAccount: BankAccount = getBankAccount(initialBalance);
    const bankBalance = bankAccount.getBalance();

    expect(bankBalance).toBe(initialBalance);
    expect(bankAccount).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const amountToWithdraw: number = initialBalance + 1;
    const bankAccount: BankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.withdraw(amountToWithdraw)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const bankAccount: BankAccount = getBankAccount(initialBalance);
    const bankAccountSec: BankAccount = getBankAccount(initialBalance);

    expect(() =>
      bankAccount.transfer(initialBalance + 1, bankAccountSec),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1000;
    const bankAccount: BankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.transfer(initialBalance + 1, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const amountToDeposit = 10;
    const bankAccount: BankAccount = getBankAccount(initialBalance);
    const depositOperation = bankAccount.deposit(amountToDeposit);

    expect(depositOperation.getBalance()).toBe(
      initialBalance + amountToDeposit,
    );
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const amountToWithdraw = 10;
    const bankAccount: BankAccount = getBankAccount(initialBalance);
    const depositOperation = bankAccount.withdraw(amountToWithdraw);

    expect(depositOperation.getBalance()).toBe(
      initialBalance - amountToWithdraw,
    );
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const amountToTransfer = 100;
    const bankAccount: BankAccount = getBankAccount(initialBalance);
    const bankAccountSec: BankAccount = getBankAccount(initialBalance);
    bankAccount.transfer(amountToTransfer, bankAccountSec);

    expect(bankAccount.getBalance()).toBe(initialBalance - amountToTransfer);
    expect(bankAccountSec.getBalance()).toBe(initialBalance + amountToTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1000;
    const bankAccount: BankAccount = getBankAccount(initialBalance);
    const result: number | null = await bankAccount.fetchBalance();

    if (result) return expect(typeof result).toBe('number');
    expect(result).toBe(null);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const bankAccount: BankAccount = getBankAccount(initialBalance);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(2000);

    await bankAccount.synchronizeBalance();

    expect(() => bankAccount.getBalance()).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const bankAccount: BankAccount = getBankAccount(initialBalance);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(async () => {
      await bankAccount.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
