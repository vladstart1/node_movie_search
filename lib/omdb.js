const http = require('http');

function get(title, done){
	const req = http.get(`http://www.omdbapi.com/?apikey=a9e07c2&t=${title}`, res => {
	if(res.statusCode !== 200){
		done(new Error(`Ошибка: ${res.statusMessage}`))
		res.resume();
		return;
	}

	res.setEncoding('utf-8');
	
	let body = '';

	res.on('data', data => body+=data);

	res.on('end', ()=>{
		let result;

		try {
			result = JSON.parse(body);
		} catch (error) {
			done(error);
		}

		if (result.Response === 'False') return done(new Error('Фильм не найден'));

		done(null, result);
	});
});

req.on('error', error=> done(error));
}

module.exports = {
	get
}