import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

const myAccStartingBalance = 100;
const yourAccStartingBalance = 0;
const myAcc = getBankAccount(myAccStartingBalance);
const yourAcc = getBankAccount(yourAccStartingBalance);
const mockedFetchAmount = 20;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(myAcc.getBalance()).toBe(myAccStartingBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() =>
      yourAcc.withdraw(yourAccStartingBalance + myAccStartingBalance),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      myAcc.transfer(myAcc.getBalance() + 100500, yourAcc),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => yourAcc.transfer(100500, yourAcc)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const currentAmount = myAcc.getBalance();
    const amountToDeposit = 100500;
    expect(myAcc.deposit(amountToDeposit).getBalance()).toBe(
      currentAmount + amountToDeposit,
    );
  });

  test('should withdraw money', () => {
    const currentAmount = myAcc.getBalance();
    const amountToWithdraw = currentAmount - 1;
    expect(myAcc.withdraw(amountToWithdraw).getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const myBalance = myAcc.getBalance();
    const yourBalance = yourAcc.getBalance();
    const amountToTransfer = 1;
    expect(myAcc.transfer(amountToTransfer, yourAcc).getBalance()).toBe(
      myBalance - amountToTransfer,
    ); // money ushli
    expect(yourAcc.getBalance()).toBe(yourBalance + amountToTransfer); // money prishli
  });

  // another easier option would be to mock fetchBalance() and return mockedFetchAmount without caring for lodash.random() result at all
  // next text case is an example of that
  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(mockedFetchAmount)
      .mockReturnValueOnce(1);
    const result = await myAcc.fetchBalance();
    expect(result).toBe(mockedFetchAmount);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(myAcc, 'fetchBalance').mockResolvedValueOnce(mockedFetchAmount);

    await myAcc.synchronizeBalance();
    expect(myAcc.getBalance()).toBe(mockedFetchAmount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(myAcc, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(myAcc.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
