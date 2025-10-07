import { Schema, model, Types } from 'mongoose';

export interface IUser {//dice el tipo que son los atributos
  name: string;
  email: string;
  avatar?: string;
  id?: Types.ObjectId;
}

const userSchema = new Schema<IUser>({//como se tiene que guardar en mongoDB
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

export const UserModel = model('User', userSchema); //el constructor para converir a mongoDB