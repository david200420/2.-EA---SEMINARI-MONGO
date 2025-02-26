import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a TS object.
export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  _id?: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  //_id: {type :String, required: true}
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);