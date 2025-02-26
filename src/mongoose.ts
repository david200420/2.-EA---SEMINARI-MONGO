import mongoose, {Types} from 'mongoose'; // npm install
import { UserModel, IUser } from './user.js';
import { CityModel, ICity } from './city.js';

async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://127.0.0.1:27017/testROCK')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
    //"_id": "1"
  };

  console.log("user1", user1); 
  const newUser= new UserModel(user1);
  const user2: IUser = await newUser.save();
  console.log("user2",user2);
  
  const exampleCity: ICity = {
    "nombre": "Valencia",
    "codigoPostal": "08001",
    "poblacion": 1620343,
    "pais": "España",
    "users": [
      { user_id : user2._id as Types.ObjectId }
    ]
  };


  console.log("exampleCity", exampleCity);

  const newCity = new CityModel(exampleCity);
  const city: ICity = await newCity.save();
  console.log("city", city);

  // Consulta para obtener los usuarios que viven en la ciudad
  const cityWithUsers = await CityModel.findOne({ nombre: 'Valencia' })
  .populate('users.user_id')
  .exec();

  console.log("cityWithUsers", cityWithUsers); 

  // Leer un usuario específico por su ID
  const usuario = await UserModel.findById(user2._id);
  console.log("get_usuario_by_id", usuario);

  // Actualizar un usuario por su ID
  const usuario_update = await UserModel.findByIdAndUpdate(user2._id, { email: "cambiado@gmail.com" });
  console.log("email cmabiado", usuario_update);

  const usuario_eliminadi = await UserModel.findByIdAndDelete(user2._id);

  console.log("usuario eliminado ", usuario_eliminadi);

}

main()

    
