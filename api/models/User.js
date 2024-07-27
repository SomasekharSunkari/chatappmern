import { Schema, model } from "mongoose";

const Userschema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Correct way to define the model
export const User = model("User", Userschema);
