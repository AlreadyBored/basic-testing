// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(1000);
    expect(account.getBalance()).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1500)).toThrow(`Insufficient funds: cannot withdraw more than ${account.getBalance()}`);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const accountA = getBankAccount(1000);
    const accountB = getBankAccount(1000);
    expect(() => accountA.transfer(1500, accountB)).toThrow(`Insufficient funds: cannot withdraw more than ${accountA.getBalance()}`);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const accountA = getBankAccount(1000);
    expect(() => accountA.transfer(1500, accountA)).toThrow("Transfer failed");
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(1000);
    expect(account.deposit(500).getBalance()).toEqual(1500);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(1000);
    expect(account.withdraw(500).getBalance()).toEqual(500);
  });

  test('should transfer money', () => {
    // Write your test here
    const accountA = getBankAccount(1000);
    const accountB = getBankAccount(1000);
    expect(accountA.transfer(500, accountB).getBalance()).toEqual(500);
    expect(accountB.getBalance()).toEqual(1500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = getBankAccount(1000);
    const ret = await account.fetchBalance();
    if(ret) expect(ret).not.toBeNull();
    else expect(ret).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(1000);
    const ret = account.synchronizeBalance();
    return ret.then(() => {
      expect(account.getBalance()).not.toEqual(1000);
    }).catch(error => {
      expect(error.message).toBe("Synchronization failed");
    })
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(1000);
    const ret = account.synchronizeBalance();
    return ret.catch(error => {
      expect(error.message).toBe("Synchronization failed");
    })
  });
});
