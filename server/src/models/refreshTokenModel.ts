import mongoose, { Schema, Document } from 'mongoose';

export type RefreshTokenType = Document & {
  userId: string;
  token: string;
};

const refreshTokenSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' },
});

export const RefreshToken = mongoose.model<RefreshTokenType>('RefreshToken', refreshTokenSchema);