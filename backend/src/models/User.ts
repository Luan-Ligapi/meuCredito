import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    username: string;
    password: string;
}

// Criação do esquema de usuário
const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Criação do modelo de usuário
export const UserModel = mongoose.model<User>('User', UserSchema);
