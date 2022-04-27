async function startApp() {
	const apiUrl = 'https://api.nbp.pl/api/exchangerates/tables/a?format=json'
	// const response = fetch(apiUrl) // fetch działa w tle, asynchronicznie
	const response = await fetch(apiUrl)
	const data = await response.json()
	// console.log(response)
	console.log(data)
	processData(data[0])
}

startApp()

function processData(data) {
	// console.log(data)
	const tableNum = data.no
	const rateArr = data.rates

	const dataTableDiv = document.getElementById('date-table')
	document.getElementById('date').innerHTML = tableNum

	rateArr.forEach(function (el) {
		const code = el.code // USD
		const currency = el.currency // dolar amerykański
		const price = el.mid // 3.98
		addRateContent(code, currency, price, dataTableDiv)
	})
}

function addRateContent(code, currency, price, dataTableDiv) {
	const el = document.createElement('div')
	el.classList.add('rate')

	el.innerHTML = `
		<div>  ${code} </div>
		<div>  ${currency} </div>
		<div>  ${price} zł </div>
	`
	dataTableDiv.append(el)
}
