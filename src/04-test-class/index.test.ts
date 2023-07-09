import lodash from 'lodash';

import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const initialBalance = 5000;
const clientBankAccount: BankAccount = getBankAccount(initialBalance);
const transfereAccountTo: BankAccount = getBankAccount(initialBalance);
const fetchedBalance = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(clientBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => clientBankAccount.withdraw(initialBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      clientBankAccount.transfer(
        clientBankAccount.getBalance() + 1,
        transfereAccountTo,
      ),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      clientBankAccount.transfer(
        clientBankAccount.getBalance() - 1,
        clientBankAccount,
      ),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const amountBeforeDeposit: number = clientBankAccount.getBalance();
    const depositAmount = 2000;

    expect(clientBankAccount.deposit(depositAmount).getBalance()).toBe(
      amountBeforeDeposit + depositAmount,
    );
  });

  test('should withdraw money', () => {
    const amountBeforeWithdrawal: number = clientBankAccount.getBalance();
    const withdrawAmount = 3000;

    expect(clientBankAccount.withdraw(withdrawAmount).getBalance()).toBe(
      amountBeforeWithdrawal - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    const amountBeforeTransfer: number = clientBankAccount.getBalance();
    const transfereAmount = 1000;
    const accountAmountBeforeTransfer: number = transfereAccountTo.getBalance();

    expect(
      clientBankAccount
        .transfer(transfereAmount, transfereAccountTo)
        .getBalance(),
    ).toBe(amountBeforeTransfer - transfereAmount);

    expect(transfereAccountTo.getBalance()).toBe(
      accountAmountBeforeTransfer + transfereAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(1);
    const result = await clientBankAccount.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(clientBankAccount, 'fetchBalance')
      .mockResolvedValueOnce(fetchedBalance);

    await clientBankAccount.synchronizeBalance();
    expect(clientBankAccount.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(clientBankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    const syncBalance =
      clientBankAccount.synchronizeBalance.bind(clientBankAccount);
    expect(syncBalance).rejects.toThrow(SynchronizationFailedError);
  });
});
