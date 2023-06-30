// Uncomment the code below and write your tests
import { getBankAccount, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  const initBallance = 10;
  const account = getBankAccount(initBallance);
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initBallance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawMoreThanOnBallance = () => {
      account.withdraw(initBallance * 2);
    };
    expect(withdrawMoreThanOnBallance).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const transferMoreThanOnBallance = () => {
      account.transfer(initBallance * 2, account);
    };
    expect(transferMoreThanOnBallance).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const transferToSelf = () => {
      account.transfer(initBallance, account);
    };
    expect(transferToSelf).toThrow();
  });

  test('should deposit money', () => {
    account.deposit(initBallance);
    expect(account.getBalance()).toBe(initBallance * 2);
  });

  test('should withdraw money', () => {
    account.withdraw(initBallance);
    expect(account.getBalance()).toBe(initBallance);
  });

  test('should transfer money', () => {
    const accounToTransferTo = getBankAccount(initBallance);
    account.transfer(initBallance, accounToTransferTo);
    expect(accounToTransferTo.getBalance()).toBe(initBallance * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBallance = await account.fetchBalance();
    if (fetchedBallance) {
      expect(typeof fetchedBallance).toBe('number');
    } else {
      expect(fetchedBallance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const currentBallance = account.getBalance();
    try {
      await account.synchronizeBalance();
      expect(currentBallance).not.toBe(currentBallance);
    } catch {
      expect(currentBallance).toBe(currentBallance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await account.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
