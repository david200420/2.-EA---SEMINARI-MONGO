import mongoose, {Types} from 'mongoose'; // npm install
import { UserModel, IUser } from './user.js';
import { CityModel, ICity } from './city.js';

async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };

  console.log("user1", user1); 
  const newUser= new UserModel(user1);
  const user2: IUser = await newUser.save();//convierte a MongoDB el objeto, y se espera a que se guerde para pasar a  la siguiente linea
  console.log("user2",user2);
  
  const exampleCity: ICity = {
    "nombre": "El Prat de Llobregat",
    "codigoPostal": "08820",
    "poblacion": 66.000,
    "pais": "España",
    "users": [
      { user_id : user2.id as Types.ObjectId }
    ]
  };


  console.log("exampleCity", exampleCity);

  const newCity = new CityModel(exampleCity);
  const city: ICity = await newCity.save();
  console.log("city", city);

  // Consulta para obtener los usuarios que viven en la ciudad
  const cityWithUsers = await CityModel.findOne({ nombre: 'El Prat de Llobregat' })
  .populate('users.user_id')
  .exec();

  console.log("cityWithUsers", cityWithUsers); 

  //solo el email
    const cityWithUsersemail = await CityModel.findOne({ nombre: 'El Prat de Llobregat' })
  .populate('users.user_id','name email')
  .exec();

  console.log("cityWithUsersemail", cityWithUsersemail); 

  // Leer un usuario específico por su ID
  const usuario = await UserModel.findById(user2.id);
  console.log("get_usuario_by_id", usuario);

  // Actualizar un usuario por su ID
  const usuario_update = await UserModel.findByIdAndUpdate(user2.id, { email: "cambiado@gmail.com" });
  const usuario3 = await UserModel.findById(user2.id);
  console.log("get_usuario_by_id", usuario3);

  const usuario_eliminadi = await UserModel.findByIdAndDelete(user2.id);

  console.log("usuario eliminado ", usuario_eliminadi);

}

main()

    
