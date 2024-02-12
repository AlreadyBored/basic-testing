// Uncomment the code below and write your tests
 import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';


describe('BankAccount', () => {
	test('should create account with initial balance', () => {
		const initialBalance = 100;
		const account =  getBankAccount(100);
		expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
  	const account =  getBankAccount(100);
    expect(() => account.withdraw(200)).toThrowError();
  });

  test('should throw error when transferring more than balance', () => {
   const account1 = new BankAccount(100);
    const account2 = new BankAccount(0);
    expect(() => account1.transfer(200, account2)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
	const account = new BankAccount(100);
	expect(() => account.transfer(50, account)).toThrowError(TransferFailedError);
 });
 

  test('should deposit money', () => {
   const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
	const account = new BankAccount(100);
	account.withdraw(50);
	expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
   const account1 = new BankAccount(100);
    const account2 = new BankAccount(0);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
	const account = new BankAccount(100);
	const balance = await account.fetchBalance();
	expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
	const account = new BankAccount(100);
	await account.synchronizeBalance();
	expect(account.getBalance()).toBeDefined();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
	const account = new BankAccount(100);
	await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
 });
});
