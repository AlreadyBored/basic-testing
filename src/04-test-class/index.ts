import { random } from 'lodash';

export class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  public deposit(amount: number): this {
    this.balance += amount;

    return this;
  }

  public withdraw(amount: number): this {
    if (amount > this.balance) {
      throw new InsufficientFundsError(this.balance);
    }
    this.balance -= amount;

    return this;
  }

  public transfer(amount: number, toAccount: BankAccount): this {
    this.withdraw(amount);
    if (this === toAccount) {
      throw new TransferFailedError();
    }
    toAccount.deposit(amount);

    return this;
  }

  public async fetchBalance(): Promise<number | null> {
    const balance = random(0, 100, false);

    console.log('balance', balance);

    const requestFailed = random(0, 1, false) === 0;
    console.log('requestFailed', random(0, 1, false));

    return requestFailed ? null : balance;
  }

  public async synchronizeBalance() {
    const balance = await this.fetchBalance();
    if (balance === null) {
      throw new SynchronizationFailedError();
    }

    this.balance = balance;
  }
}

export const getBankAccount = (initialBalance: number): BankAccount => {
  return new BankAccount(initialBalance);
};

export class TransferFailedError extends Error {
  constructor() {
    super('Transfer failed');
  }
}

export class SynchronizationFailedError extends Error {
  constructor() {
    super('Synchronization failed');
  }
}

export class InsufficientFundsError extends Error {
  constructor(balance: number) {
    super(`Insufficient funds: cannot withdraw more than ${balance}`);
  }
}
