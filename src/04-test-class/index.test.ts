import { random } from 'lodash';
import { getBankAccount } from '.';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const initialBalance = 670000;
  const bankAccount = getBankAccount(0);

  beforeEach(() => {
    const balance = bankAccount.getBalance();
    bankAccount.withdraw(balance).deposit(initialBalance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(1000000)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const thirdPartyAccount = getBankAccount(0);
    expect(() => bankAccount.transfer(1000000, thirdPartyAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(1000000, bankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const deposit = 11000000;
    const balance = bankAccount.deposit(deposit).getBalance();
    expect(balance).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    const withdrawMoney = 55000;
    const balance = bankAccount.withdraw(withdrawMoney).getBalance();
    expect(balance).toBe(initialBalance - withdrawMoney);
  });

  test('should transfer money', () => {
    const transfer = 110000;
    const thirdPartyAccount = getBankAccount(0);
    const balance = bankAccount
      .transfer(transfer, thirdPartyAccount)
      .getBalance();
    expect(balance).toBe(initialBalance - transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(99).mockReturnValueOnce(1);
    const fetchedBalance = await bankAccount.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 999999;
    (random as jest.Mock).mockReturnValueOnce(999999).mockReturnValueOnce(1);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(999999).mockReturnValueOnce(0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
