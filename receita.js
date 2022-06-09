const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const url =
	'https://www.gov.br/receitafederal/pt-br/assuntos/agenda-tributaria/agenda-tributaria-2022/junho/declaracoes';

request(url, function (error, response, html) {
	if (!error) {
		var resultados = [];
		var $ = cheerio.load(html);
		$('.listing')
			.find('tr')
			.each(function (i) {
				var data = $(this).find('td').eq(0).text().trim();
				var description = $(this).find('td').eq(1).text().trim();
                var period = $(this).find('td').eq(2).text().trim();

				// Inserindo os dados num array
				if (data !== '' || description !== '' || period !== '') {
					resultados.push({
						data,
						description,
						period,
					});
				}
			});
		fs.writeFile(
			'dados.json',
			JSON.stringify(resultados, null, 4),
			function (err) {
				console.log(
					'Resultados salvos com sucesso! O arquivo está na raiz do projeto.'
				);
			}
		);
	} else {
		console.log('Houve um problema ao abrir o endereço informado');
	}
});
