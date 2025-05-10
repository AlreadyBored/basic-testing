// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

const initialBalance = 100;
const exceededAmount = 200;
const mockedFetchedBalance = 50;
const InsufficientFundsErrorMessage = `Insufficient funds: cannot withdraw more than ${initialBalance}`;

describe('BankAccount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    const receivedInitialBalance = getBankAccount(initialBalance).getBalance();

    expect(receivedInitialBalance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withDrawExceededAmount = () => {
      getBankAccount(initialBalance).withdraw(exceededAmount);
    };

    expect(withDrawExceededAmount).toThrow(InsufficientFundsError);
    expect(withDrawExceededAmount).toThrow(
      new Error(InsufficientFundsErrorMessage),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const firstBankAccount = getBankAccount(initialBalance);
    const secondBankAccount = getBankAccount(initialBalance);

    const transferExceededAmount = () => {
      firstBankAccount.transfer(exceededAmount, secondBankAccount);
    };

    expect(transferExceededAmount).toThrow(InsufficientFundsError);
    expect(transferExceededAmount).toThrow(
      new Error(InsufficientFundsErrorMessage),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance);

    const transferToTheSameAccount = () => {
      bankAccount.transfer(initialBalance, bankAccount);
    };

    expect(transferToTheSameAccount).toThrow(TransferFailedError);
    expect(transferToTheSameAccount).toThrow(new Error('Transfer failed'));
  });

  test('should deposit money', () => {
    const depositAmount = 200;
    const expectedActualBalance = 300;

    const actualBalance = getBankAccount(initialBalance)
      .deposit(depositAmount)
      .getBalance();

    expect(actualBalance).toBe(expectedActualBalance);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 40;
    const expectedActualBalance = 60;

    const actualBalance = getBankAccount(initialBalance)
      .withdraw(withdrawAmount)
      .getBalance();

    expect(actualBalance).toBe(expectedActualBalance);
  });

  test('should transfer money', () => {
    const transferAmount = 40;
    const expectedFirstAccountBalance = 60;
    const expectedSecondAccountBalance = 140;

    const firstBankAccount = getBankAccount(initialBalance);
    const secondBankAccount = getBankAccount(initialBalance);

    firstBankAccount.transfer(transferAmount, secondBankAccount);

    const actualFirstBankAccountBalance = firstBankAccount.getBalance();
    const actualSecondBankAccountBalance = secondBankAccount.getBalance();

    expect(actualFirstBankAccountBalance).toBe(expectedFirstAccountBalance);
    expect(actualSecondBankAccountBalance).toBe(expectedSecondAccountBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => mockedFetchedBalance);

    const fetchedBalance = await getBankAccount(initialBalance).fetchBalance();

    expect(fetchedBalance).toBe(mockedFetchedBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(initialBalance);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(async () => mockedFetchedBalance);

    await bankAccount.synchronizeBalance();
    const synchronizedBalance = bankAccount.getBalance();

    expect(synchronizedBalance).toBe(mockedFetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(initialBalance);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(async () => null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      new Error('Synchronization failed'),
    );
  });
});
