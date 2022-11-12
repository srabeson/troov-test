import { model, Schema } from "mongoose";

interface IUser {
  email: string;
  password_hash: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
