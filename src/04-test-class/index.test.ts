// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  let bankAccount: any;
  const money = 1000000000000000;

  beforeEach(() => {
    bankAccount = getBankAccount(money);
  });

  test('should create account with initial balance', () => {
    const balance = bankAccount.getBalance();
    expect(balance).toBe(money);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(money + 1)).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const transferBankAccount = getBankAccount(money);
    expect(() => bankAccount.transfer(money + 1, transferBankAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(money + 1, bankAccount)).toThrow();
  });

  test('should deposit money', () => {
    const depositAmount = 100;
    const finalAmount = money + depositAmount;
    expect(bankAccount.deposit(depositAmount).getBalance()).toBe(finalAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 100;
    const finalAmount = money - withdrawAmount;
    expect(bankAccount.withdraw(withdrawAmount).getBalance()).toBe(finalAmount);
  });

  test('should transfer money', () => {
    const transferAmount = 100;
    const transferBankAccount = getBankAccount(money);
    bankAccount.transfer(transferAmount, transferBankAccount);
    expect(bankAccount.getBalance()).toBe(money - transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);

    const balance = await bankAccount.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 2000000000000000;

    bankAccount.fetchBalance = jest.fn().mockResolvedValue(newBalance);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    bankAccount.fetchBalance = jest.fn().mockResolvedValue(null);

    expect(() => bankAccount.synchronizeBalance()).rejects.toThrow();
  });
});
