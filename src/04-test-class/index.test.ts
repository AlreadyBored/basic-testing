// Uncomment the code below and write your tests
import { getBankAccount } from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const balance = account.getBalance();

    expect(balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawAmount = 1000;

    const account = getBankAccount(initialBalance);

    const withdraw = () => account.withdraw(withdrawAmount);

    expect(withdraw).toThrowError();
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const transferAmount = 150;

    const account = getBankAccount(initialBalance);
    const recieverAccount = getBankAccount(initialBalance);

    const transfer = () => account.transfer(transferAmount, recieverAccount);

    expect(transfer).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 50;

    const account = getBankAccount(initialBalance);

    const transfer = () => account.transfer(transferAmount, account);

    expect(transfer).toThrowError();
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmout = 50;

    const account = getBankAccount(initialBalance);

    account.deposit(depositAmout);
    const balance = account.getBalance();

    expect(balance).toBe(150);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 20;

    const account = getBankAccount(initialBalance);

    account.withdraw(withdrawAmount);
    const balance = account.getBalance();

    expect(balance).toBe(80);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const transferAmount = 30;

    const account = getBankAccount(initialBalance);
    const recieverAccount = getBankAccount(initialBalance);

    account.transfer(transferAmount, recieverAccount);

    const balance = account.getBalance();
    const recieverBalance = recieverAccount.getBalance();

    expect(balance).toBe(70);
    expect(recieverBalance).toBe(130);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);

    jest.spyOn(_, 'random').mockReturnValue(5);

    await expect(account.fetchBalance()).resolves.toBe(5);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(5);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(() => account.synchronizeBalance()).rejects.toThrowError();
  });
});
