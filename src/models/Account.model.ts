import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true, 
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
    timestamps: true, 
  }
);

accountSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Account = mongoose.model<IAccount>('Account', accountSchema);