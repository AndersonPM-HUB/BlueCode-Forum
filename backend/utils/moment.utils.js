import moment from 'moment';

/*
	Permite conocer el tiempo en formato dias
	y horas, minutos y segundos
*/
function getTime(){
	let time = moment();
	let days = time.format('YYYY-MM-DD')
	let hours = time.format('HH:mm:ss')

	return `${days}T${hours}`;
}

export { getTime }