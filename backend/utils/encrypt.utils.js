import bcrypt from 'bcrypt';

const saltRounds = 10;
/*
	Encripa los datos planos que se le envíen

	datos: String texto plano

	return String contraseña encriptada
*/
async function encryptData(datos) {
	return await bcrypt.hash(datos, saltRounds);
}


export { encryptData }