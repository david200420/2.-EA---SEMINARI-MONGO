import { Schema, model, Types, ObjectId } from 'mongoose';

export interface ICity {
  nombre: string;
  codigoPostal: string;
  poblacion: number;
  pais: string;
  users: {
    user_id: Types.ObjectId;
  }[]; // Array de IDs de usuarios
  _id?: Types.ObjectId;
}

const citySchema = new Schema<ICity>({
  nombre: { type: String, required: true },
  codigoPostal: { type: String, required: true },
  poblacion: { type: Number, required: true },
  pais: { type: String, required: true },
  users: [{ user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true } }]
});


export const CityModel = model('City', citySchema);
