// Uncomment the code below and write your tests
import lodash from 'lodash';
import { BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let firstAcc: BankAccount;
  let secondAcc: BankAccount;
  let operationNum: number;

  beforeEach(() => firstAcc = getBankAccount(initialBalance));
  afterEach(() => jest.clearAllMocks());

  test('should create account with initial balance', () => {
    // Write your test here
    expect(firstAcc.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    operationNum = initialBalance * 3;

    expect(() => firstAcc.withdraw(operationNum)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    secondAcc = getBankAccount(initialBalance);
    operationNum = initialBalance * 3;

    expect(() => firstAcc.transfer(operationNum, secondAcc)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    operationNum = initialBalance * 0.2;

    expect(() => firstAcc.transfer(operationNum, firstAcc)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    operationNum = initialBalance * 0.2;
    const expectedBalance = initialBalance + operationNum;

    firstAcc.deposit(operationNum);
    expect(firstAcc.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    // Write your test here
    operationNum = initialBalance * 0.2;
    const expectedBalance = initialBalance - operationNum;

    firstAcc.withdraw(operationNum);
    expect(firstAcc.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    // Write your test here
    secondAcc = getBankAccount(initialBalance);
    operationNum = initialBalance * 0.2;

    const expectedMainBalance = initialBalance - operationNum;
    const expectedSecondBalance = initialBalance + operationNum;

    firstAcc.transfer(operationNum, secondAcc);

    expect(firstAcc.getBalance()).toBe(expectedMainBalance);
    expect(secondAcc.getBalance()).toBe(expectedSecondBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const balance = 50;

    const spyRandom = jest.spyOn(lodash, 'random');
    spyRandom.mockReturnValueOnce(balance);
    spyRandom.mockReturnValueOnce(1);

    const fetchedBalance = await firstAcc.fetchBalance();

    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const balance = 50;

    const spyFetchBalance = jest.spyOn(firstAcc, 'fetchBalance');
    spyFetchBalance.mockResolvedValueOnce(balance);

    expect(firstAcc.getBalance()).toBe(initialBalance);
    await firstAcc.synchronizeBalance();
    expect(firstAcc.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const spyFetchBalance = jest.spyOn(firstAcc, 'fetchBalance');
    spyFetchBalance.mockResolvedValueOnce(null);

    await expect(firstAcc.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});
