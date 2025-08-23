import { Transaction } from "sequelize";
import { IFinanceCreate, IFinanceResponse } from "../interfaces/finance.interface";
import { Account } from "../models/Account.model";
import mongoose from "mongoose";
import { Types } from "mongoose";


class InsufficentsBallanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InsufficentsBallanceError";
  }
}

export class FinanceService {
  async createTransaction(transaction: IFinanceCreate): Promisse<IFinanceResponse> {
    const accaunt = await Account.findOne({
      _id: transaction.accountId,
      userId: transaction.userId,
    });
    if (!accaunt) {
      throw new Error("Account not found");
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const [newTransaction] = await Transaction.create(
        [
          {
            ...transaction,
            // Não precisa criar _id manualmente, Mongoose faz isso
            userId: new Types.ObjectId(transaction.userId),
            accountId: new Types.ObjectId(transaction.accountId),
          },
        ],
        { session }
      );
  };
}
