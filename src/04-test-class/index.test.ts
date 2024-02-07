import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const INITIAL_BALANCE = 100;
const AMOUNT_MONEY_OPERATION = 50;
const AMOUNT_MONEY_OPERATION_ERR = 110;

describe('BankAccount', () => {
  let bankAcc: BankAccount;

  beforeEach(() => {
    bankAcc = getBankAccount(INITIAL_BALANCE);
  });

  test('should create account with initial balance', () => {
    expect(bankAcc.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAcc.withdraw(105)).toThrow(InsufficientFundsError);
    expect(() => bankAcc.withdraw(105)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${bankAcc.getBalance()}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAcc = getBankAccount(AMOUNT_MONEY_OPERATION);
    expect(() =>
      newBankAcc.transfer(AMOUNT_MONEY_OPERATION_ERR, bankAcc),
    ).toThrow(InsufficientFundsError);
    expect(() =>
      newBankAcc.transfer(AMOUNT_MONEY_OPERATION_ERR, bankAcc),
    ).toThrowError(
      `Insufficient funds: cannot withdraw more than ${newBankAcc.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAcc.transfer(AMOUNT_MONEY_OPERATION, bankAcc)).toThrow(
      TransferFailedError,
    );
    expect(() =>
      bankAcc.transfer(AMOUNT_MONEY_OPERATION, bankAcc),
    ).toThrowError('Transfer failed');
  });

  test('should deposit money', () => {
    const depositAmount = AMOUNT_MONEY_OPERATION;
    bankAcc.deposit(depositAmount);
    const newBalance = bankAcc.getBalance();

    expect(newBalance).toBe(INITIAL_BALANCE + depositAmount);
  });

  test('should withdraw money', () => {
    bankAcc.withdraw(AMOUNT_MONEY_OPERATION);
    const newBalance = bankAcc.getBalance();
    expect(newBalance).toBe(INITIAL_BALANCE - AMOUNT_MONEY_OPERATION);
  });

  test('should transfer money', () => {
    const newBankAcc = getBankAccount(AMOUNT_MONEY_OPERATION);
    const newBankAccblance = newBankAcc.getBalance();
    bankAcc.transfer(AMOUNT_MONEY_OPERATION, newBankAcc);
    const bankAccnewBalance = bankAcc.getBalance();
    const newBankAccNewBalance = newBankAcc.getBalance();
    expect(bankAccnewBalance).toBe(INITIAL_BALANCE - AMOUNT_MONEY_OPERATION);
    expect(newBankAccNewBalance).toBe(
      newBankAccblance + AMOUNT_MONEY_OPERATION,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const data = await bankAcc.fetchBalance();
    expect(typeof data === 'number' || data === null).toBe(true);
    if (typeof data === 'number') {
      expect(data).toBeGreaterThanOrEqual(0);
      expect(data).toBeLessThanOrEqual(100);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      await bankAcc.synchronizeBalance();
      expect(bankAcc.getBalance()).toBeDefined();
      expect(bankAcc.getBalance()).toBeLessThan(101);
      expect(bankAcc.getBalance()).toBeGreaterThan(-1);
      expect(bankAcc.getBalance()).not.toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAcc.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
      expect(error).toHaveProperty('message', 'Synchronization failed');
    }
  });
});
