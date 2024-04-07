import mongoose, { Schema, Document } from "mongoose";

export type SettingsType = Document & {
  userId: mongoose.Types.ObjectId;
  colorTheme: string;
  fontSize: string;
};

const settingsSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, unique: true },
  colorTheme: { type: String, required: true },
  fontSize: { type: String, required: true },
});

export const Settings = mongoose.model<SettingsType>(
  "Settings",
  settingsSchema
);
