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

/*
	Permite comprobar que un hash pertenece al 
	texto plano que se le envía

	datos: String texto plano
	hash: String hash

	return Boolean
*/
async function compareData(datos, hash) {
	return await bcrypt.compare(datos, hash);
}

export { encryptData, compareData }