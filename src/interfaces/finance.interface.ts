export interface IFinanceCreate {
  userId: string;
  accountId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date?: Date; 
}

export interface IFinanceResponse {
  _id: string;
  userId: string;
  accountId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string; 
  date: Date;
}