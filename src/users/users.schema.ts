import { Schema } from "mongoose";


export const UserSchema = new Schema({
        name: String,
        email: String,
        password: String,
        isActive: {
                type: Boolean,
                default: true
        },
        isDelete: {
                type: Boolean,
                default: false
        },
        createdAt: Date,
})