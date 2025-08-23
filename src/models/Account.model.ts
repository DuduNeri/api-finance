import mongoose, { Schema, Document } from 'mongoose';

// Interface para o documento Account
export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schema do Mongoose para Account
const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true, // Índice para consultas mais rápidas
    },
    name: {
      type: String,
      required: [true, 'Account name is required'],
      trim: true,
      maxlength: [50, 'Account name cannot exceed 50 characters'],
    },
    type: {
      type: String,
      enum: {
        values: ['checking', 'savings', 'investment'],
        message: '{VALUE} is not a valid account type',
      },
      required: [true, 'Account type is required'],
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      min: [0, 'Balance cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  }
);

// Índice composto para buscas por userId e name
accountSchema.index({ userId: 1, name: 1 }, { unique: true });

// Exportar o modelo
export const Account = mongoose.model<IAccount>('Account', accountSchema);