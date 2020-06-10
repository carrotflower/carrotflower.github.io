function convert(amount, curFrom, curTo) {
	if (curFrom == 'UAH' || curTo == 'UAH') {
		fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').then((res) => {
			return res.json();
		}).then((res) => {
			if (curFrom == 'UAH') {
				if (curTo != 'UAH') {
					let convertedCur = res.find(cur => {
						return cur.cc == curTo
					});
					document.getElementById('to').value = (amount/convertedCur.rate).toFixed(3);
				} else {
					document.getElementById('to').value = amount;
				}
			} else if (curTo == 'UAH') {
				let convertedCur = res.find(cur => {
					return cur.cc == curFrom
				});
				document.getElementById('to').value = (amount*convertedCur.rate).toFixed(3);
			}
		});
	} else {
		fetch(`https://api.exchangeratesapi.io/latest?base=${curFrom}`).then((res) => {
			return res.json();
		}).then((res) => {
			let convertedCurRate = res.rates[curTo];
			document.getElementById('to').value = (convertedCurRate / amount).toFixed(3);
		});
	}
}

document.getElementById('from').onkeyup = (e) => {
	convert(e.target.value,
		document.getElementById('fromCurrency').value,
		document.getElementById('toCurrency').value,
	);
}

document.getElementById('fromCurrency').onkeyup = (e) => {
	convert(document.getElementById('from').value,
		document.getElementById('fromCurrency').value,
		document.getElementById('toCurrency').value,
	);
}

document.getElementById('to').onkeyup = (e) => {
	convert(document.getElementById('from').value,
		document.getElementById('fromCurrency').value,
		document.getElementById('toCurrency').value,
	);
}

document.getElementById('toCurrency').onkeyup = (e) => {
	convert(document.getElementById('from').value,
		document.getElementById('fromCurrency').value,
		document.getElementById('toCurrency').value,
	);
}

document.getElementById('image').onclick = (e) => {
	let from = document.getElementById('from').value;
	let to = document.getElementById('to').value;
	// document.getElementById('from').value = to;
	// document.getElementById('to').value = from;
	from = document.getElementById('fromCurrency').value;
	to = document.getElementById('toCurrency').value;
	document.getElementById('fromCurrency').value = to;
	document.getElementById('toCurrency').value = from;
	convert(document.getElementById('from').value,
		document.getElementById('fromCurrency').value,
		document.getElementById('toCurrency').value,
	);
}
