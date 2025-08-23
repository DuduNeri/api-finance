import { Account } from './../models/Account.model';
import mongoose, { Types } from 'mongoose';
import userModel from '../models/User.model';
import { Transaction } from '../models/Transaction.model';
import  User  from '../models/User.model';
import { IFinanceCreate, IFinanceResponse } from '../interfaces/finance.interface';

class InsuficientBallanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InsuficientBallanceError';
  }
}

export class FinanceServices {
  async createTransaction(data: IFinanceCreate): Promise<IFinanceResponse>{
      const account = await Transaction.findOne({
        _id: data.accountId,
       userId: data.userId
      })
      if(!account){
        throw new Error('Account not found')
      }
      if (transaction.type === 'expense' && account.balance < transaction.amount) {
      throw new InsufficientBalanceError('Saldo insuficiente');
    }
  }
}