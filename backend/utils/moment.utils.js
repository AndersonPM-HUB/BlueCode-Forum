import moment from 'moment';

/*
	Permite conocer el tiempo en formato año, meses, dias
	y horas, minutos y segundos
*/
function getTime(){
	let time = moment();
	let days = time.format('YYYY-MM-DD')
	let hours = time.format('HH:mm:ss')

	return `[${days}]:[${hours}]`;
}

export { getTime }