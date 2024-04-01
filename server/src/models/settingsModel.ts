import mongoose, { Schema, Document } from "mongoose";

export type SettingsType = Document & {
  userId: string;
  colorTheme: string;
  fontSize: string;
};

const settingsSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  colorTheme: { type: String, required: true },
  fontSize: { type: String, required: true },
});

export const Settings = mongoose.model<SettingsType>(
  "Settings",
  settingsSchema
);
