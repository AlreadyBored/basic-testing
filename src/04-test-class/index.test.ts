// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';
import * as lodash from 'lodash';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const INITIAL_BALANCE = 100
  const MORE_THAN_INITIAL_BALANCE = 200
  let account: BankAccount

  beforeEach(()=>{
    account = getBankAccount(INITIAL_BALANCE)
    jest.clearAllMocks();
  })
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(INITIAL_BALANCE)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(()=>account.withdraw(MORE_THAN_INITIAL_BALANCE)).toThrow(InsufficientFundsError)
  });

  test('should throw error when transferring more than balance', () => {
    const otherAccount = getBankAccount(INITIAL_BALANCE)
    expect(()=>account.transfer(MORE_THAN_INITIAL_BALANCE, otherAccount)).toThrow(InsufficientFundsError)
  });

  test('should throw error when transferring to the same account', () => {
    expect(()=>account.transfer(INITIAL_BALANCE, account)).toThrow(TransferFailedError)
  });

  test('should deposit money', () => {
    const COUNT_MONEY_FOR_DEPOSIT = 50;
    const expectedBalance = INITIAL_BALANCE + COUNT_MONEY_FOR_DEPOSIT;
    account.deposit(COUNT_MONEY_FOR_DEPOSIT);
    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const COUNT_MONEY_FOR_WITHDRAW = 50;
    const expectedBalance = INITIAL_BALANCE - COUNT_MONEY_FOR_WITHDRAW;
    account.withdraw(COUNT_MONEY_FOR_WITHDRAW);
    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const COUNT_MONEY_FOR_TRANSFER = 50;
    const expectedBalance = INITIAL_BALANCE - COUNT_MONEY_FOR_TRANSFER;
    const otherAccount = getBankAccount(MORE_THAN_INITIAL_BALANCE);
    account.transfer(COUNT_MONEY_FOR_TRANSFER, otherAccount);
    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (lodash.random as jest.Mock)
    .mockImplementationOnce(() => 50)
    .mockImplementationOnce(() => 1);
    const balance = await account.fetchBalance();
    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (lodash.random as jest.Mock).mockImplementationOnce(() => 50).mockImplementationOnce(() => 1);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (lodash.random as jest.Mock).mockImplementationOnce(() => INITIAL_BALANCE).mockImplementationOnce(() => 0);
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
