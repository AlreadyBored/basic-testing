// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

jest.mock('lodash');

describe('BankAccount', () => {
  let acc: BankAccount;
  const mockedRandom = jest.mocked(lodash.random);

  beforeEach(() => {
    acc = getBankAccount(12);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(acc.getBalance()).toEqual(12);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => acc.withdraw(13)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const dstAcc = getBankAccount(12);
    expect(() => acc.transfer(13, dstAcc)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => acc.transfer(10, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    acc.deposit(1);
    expect(acc.getBalance()).toEqual(13);
  });

  test('should withdraw money', () => {
    acc.withdraw(1);
    expect(acc.getBalance()).toEqual(11);
  });

  test('should transfer money', () => {
    const dstAcc = getBankAccount(12);
    acc.transfer(1, dstAcc);
    expect(acc.getBalance()).toEqual(11);
    expect(dstAcc.getBalance()).toEqual(13);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    mockedRandom.mockReturnValue(1);
    return expect(acc.fetchBalance()).resolves.toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    mockedRandom.mockReturnValueOnce(200).mockReturnValueOnce(1);
    await acc.synchronizeBalance();
    return expect(acc.getBalance()).toEqual(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    mockedRandom.mockReturnValueOnce(200).mockReturnValueOnce(0);
    return expect(() => acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
