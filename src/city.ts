import { Schema, model, Types, ObjectId } from 'mongoose';
//import { IUser } from './user.ts'; // Asegúrate de importar la interfaz IUser si está en otro archivo.

// 1. Crear una interfaz que represente un objeto TS.
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

// 2. Crear un esquema que corresponda al documento en MongoDB.
const citySchema = new Schema<ICity>({
  nombre: { type: String, required: true },
  codigoPostal: { type: String, required: true },
  poblacion: { type: Number, required: true },
  pais: { type: String, required: true },
  users: [{ user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true } }] // Array de referencias a usuarios
});

// 3. Crear un modelo.
export const CityModel = model('City', citySchema);
