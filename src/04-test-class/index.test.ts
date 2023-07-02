import {
  getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError,
} from '.';

describe('BankAccount', () =>
  test('should create account with initial balance', () => {
    const myBankAccount = getBankAccount(500);
    expect(myBankAccount.getBalance()).toBe(500);
  });

test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
  const myBankAccount = getBankAccount(500);
  const insufficient = new InsufficientFundsError(500);
  expect(() => myBankAccount.withdraw(505)).toThrowError(insufficient);
});

test('should throw error when transferring more than balance', () => {
  const myFirstBankAccount = getBankAccount(500);
  const mySecondBankAccount = getBankAccount(0);
  const insufficient = new InsufficientFundsError(500);
  expect(() => myFirstBankAccount.transfer(505, mySecondBankAccount)).toThrowError(insufficient);
});

test('should throw error when transferring to the same account', () => {
  const myBankAccount = getBankAccount(500);
  const transfer = new TransferFailedError();
  expect(() => myBankAccount.transfer(500, myBankAccount)).toThrowError(transfer);
});

test('should deposit money', () => {
  const myBankAccount = getBankAccount(0);
  myBankAccount.deposit(500);
  expect(myBankAccount.getBalance()).toBe(500);
});

test('should withdraw money', () => {
  const myBankAccount = getBankAccount(550);
  myBankAccount.withdraw(500);
  expect(myBankAccount.getBalance()).toBe(50);
});

test('should transfer money', () => {
  const myBankAccount = getBankAccount(500);
  const mySecondBankAccount = getBankAccount(0);
  myBankAccount.transfer(500, mySecondBankAccount);
  expect(myBankAccount.getBalance()).toBe(500);
});

test.each([
  { initialBalance: 500, expectedType: 'number' },
])(
  'fetchBalance should return number in case if request did not fail',
  async ({ initialBalance, expectedType }) => {
    const myBankAccount = getBankAccount(initialBalance);
    const myBalance = await myBankAccount.fetchBalance();
    if (myBalance !== null) {
      expect(typeof myBalance).toBe(expectedType);
    } else {
      expect(myBalance).toBeNull();
    }
  }
);

test.each([
  { initialBalance: 550, newBalance: 500 },
])(
  'should set new balance if fetchBalance returned number',
  async ({ initialBalance, newBalance }) => {
    const myBankAccount = getBankAccount(initialBalance);
    myBankAccount.fetchBalance = async () => newBalance;
    await myBankAccount.synchronizeBalance();
    expect(myBankAccount.getBalance()).toBe(newBalance);
  }
);

test.each([
  { initialBalance: 500, error: new SynchronizationFailedError() },
])(
  'should throw SynchronizationFailedError if fetchBalance returned null',
  async ({ initialBalance, error }) => {
    const myBankAccount = getBankAccount(initialBalance);
    myBankAccount.fetchBalance = async () => null;
    await expect(myBankAccount.synchronizeBalance()).rejects.toThrowError(error);
  }
);
)}

