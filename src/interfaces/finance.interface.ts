export interface IFinance {
  name: string;
  value: number;
  type: "entrada" | "saida";
}

export interface IFinanceCreate {
  name: string;
  value: number;
  type: "entrada" | "saida";
}

export interface IFinanceUpdate {
  name?: string;
  value?: number;
  type?: "entrada" | "saida";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFinanceResponse{
  _id: string;
  name: string;
  value: number;
  type: "entrada" | "saida";
}

export interface IFinanceDelete{
  _id: string;
}

export interface IFinanceFilter{
  query: string;
  type: "entrada" | "saida";
}

export interface IFinanceFilterResponse{
  _id: string;
  name: string;
  value: number;
  type: "entrada" | "saida";
}