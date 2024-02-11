import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const newBankAccount = getBankAccount(1000);
    expect(newBankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.withdraw(1001)).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const yourBankAccount = getBankAccount(1000);
    const anotherBankAccount = getBankAccount(0);

    expect(() => yourBankAccount.transfer(1001, anotherBankAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.transfer(1000, bankAccount)).toThrow();
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.deposit(1000).getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.withdraw(1000).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const yourBankAccount = getBankAccount(1000);
    const anotherBankAccount = getBankAccount(0);

    expect(yourBankAccount.transfer(1000, anotherBankAccount).getBalance()).toBe(0);
    expect(anotherBankAccount.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);

    const balance = await bankAccount.fetchBalance();
    
    expect(typeof balance).toBe('number');
    jest.spyOn(bankAccount, 'fetchBalance').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100);
    const newBalance = 200;
   
    bankAccount.fetchBalance = jest.fn().mockResolvedValue(newBalance);

    await bankAccount.synchronizeBalance();
 
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);
    bankAccount.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow();
  });
});
