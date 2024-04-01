import mongoose, { Schema, Document } from 'mongoose';

export type UserType = Document & {
  email: string;
  username: string;
  passwordHash: string;
};

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export const User = mongoose.model<UserType>('User', userSchema);