import mongoose, { Schema, Document } from "mongoose";

interface IAddress {
    city: string;
    state: string;
    country: string;
    street: string;
}

export interface IItems extends Document {
    id: string;
    gender: string;
    name: string;
    address: IAddress;
    email: string;
    age: number;
    picture: string;
    createdAt: Date;
}

const AddressSchema = new Schema<IAddress>({
    city: String,
    state: String,
    country: String,
    street: String,
});

const UserSchema = new Schema<IItems>({
    id: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    address: AddressSchema,
    email: { type: String, required: true },
    age: { type: Number, required: true },
    picture: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IItems>("User", UserSchema);
