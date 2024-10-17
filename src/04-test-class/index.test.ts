// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  // SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 400000;
    const bankAccount = getBankAccount(initialBalance);

    const resultBalance = bankAccount.getBalance();

    expect(resultBalance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 250000;
    const withdrawingBalance = 250250;
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.withdraw(withdrawingBalance)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 250000;
    const transferringBalance = 250250;
    const sendlerBankAccount = getBankAccount(initialBalance);
    const receiverBankAccount = getBankAccount(initialBalance);

    expect(() =>
      sendlerBankAccount.transfer(transferringBalance, receiverBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 250000;
    const transferringBalance = 42300;
    const bankAccount = getBankAccount(initialBalance);

    expect(() =>
      bankAccount.transfer(transferringBalance, bankAccount),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 250000;
    const depositAmount = 50000;
    const bankAccount = getBankAccount(initialBalance);

    const newExpectedBalance = 300000;

    bankAccount.deposit(depositAmount);
    const resultBalance = bankAccount.getBalance();

    expect(resultBalance).toBe(newExpectedBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 250000;
    const withdrawAmount = 50000;
    const bankAccount = getBankAccount(initialBalance);

    const newExpectedBalance = 200000;

    bankAccount.withdraw(withdrawAmount);
    const resultBalance = bankAccount.getBalance();

    expect(resultBalance).toBe(newExpectedBalance);
  });

  test('should transfer money', () => {
    const initialSendlerBalance = 12500;
    const initialReceiverBalance = 2500;
    const transferringBalance = 2500;
    const sendlerBankAccount = getBankAccount(initialSendlerBalance);
    const receiverBankAccount = getBankAccount(initialReceiverBalance);

    sendlerBankAccount.transfer(transferringBalance, receiverBankAccount);

    const newSendlerBalance = sendlerBankAccount.getBalance();
    const newRecieverBalance = receiverBankAccount.getBalance();

    const expectedSendlerBalance = 10000;
    const expectedRecieverBalance = 5000;

    expect(newSendlerBalance).toBe(expectedSendlerBalance);
    expect(newRecieverBalance).toBe(expectedRecieverBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 250000;

    const bankAccount = getBankAccount(initialBalance);

    const fetchResult = await bankAccount.fetchBalance();

    expect(fetchResult).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 250000;

    const bankAccount = getBankAccount(initialBalance);

    const newExpectedBalance = 50;

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValue(newExpectedBalance);

    await bankAccount.synchronizeBalance();
    const resultBalance = bankAccount.getBalance();

    expect(resultBalance).toBe(newExpectedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 250000;

    const bankAccount = getBankAccount(initialBalance);

    const newExpectedBalance = null;

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValue(newExpectedBalance);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
