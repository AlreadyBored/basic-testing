import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import _ from 'lodash';

describe(BankAccount.name, () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100);

    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(100);

    expect(() => bankAccount.withdraw(120)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(100);
    const receiverBankAccount = getBankAccount(150);

    expect(() => bankAccount.transfer(120, receiverBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100);

    expect(() => bankAccount.transfer(120, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);
    const bankAccountAfterDeposit = bankAccount.deposit(120);

    expect(bankAccountAfterDeposit.getBalance()).toBe(220);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100);
    const bankAccountAfterWithdraw = bankAccount.withdraw(50);

    expect(bankAccountAfterWithdraw.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const senderAccount = getBankAccount(150);
    const receiverBankAccount = getBankAccount(50);
    const senderAccountAfterTransfer = senderAccount.transfer(
      150,
      receiverBankAccount,
    );

    expect(senderAccountAfterTransfer.getBalance()).toBe(0);
    expect(receiverBankAccount.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);
    jest.spyOn(_, 'random').mockReturnValue(1);

    const balance = await bankAccount.fetchBalance();

    expect(balance).not.toBeNull();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100);

    jest.spyOn(_, 'random').mockReturnValue(1);

    await bankAccount.synchronizeBalance();

    const newBalance = bankAccount.getBalance();

    expect(newBalance).toBeGreaterThanOrEqual(0);
    expect(newBalance).toBeLessThanOrEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);

    jest.spyOn(_, 'random').mockReturnValue(0);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
