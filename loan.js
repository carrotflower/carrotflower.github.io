var button = document.querySelector('#button');
var field = document.querySelector('#takeDay');
var date = new Date();
var annDiff = document.querySelector('#annDiff');
var paymentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);
var total = document.querySelector('#totalSum');


var my = document.querySelector('#monthYear');
var op = document.querySelector('#op');




// function AddMonth(date, i) {
// 	var dy = date.getDay(); 
// 	date.setMonth(date.getMonth() + i * 1); 
// 	date.setDate(date.getDate() - (date.getDay()-dy)); 
// 	return date; 
// };
// AddMonth(new Date("2018/09/18"), 1);

function different(){
	let term = document.getElementById('term').value;
	let loanSum = document.getElementById('sum').value;
	let rate = document.getElementById('interest').value;
	let displayOfResult = document.querySelector('#res');
	console.log(term+'term');
	let n = 0;
	let b = 0; 
	var a = 0;	
	
	console.log(b+" -b");
	let p = 0; 
	let result = 0; 
	let table = document.querySelector('.result');
	let str = '<table><tr><th>Місяць</th><th>Заборгованість</th><th>Відсоток</th><th>Основний борг</th><th>Сума платежу</th></tr>';
	let percent = 0;
	let paymentSum = 0;
	let yearTerm = 0;
	

	if (my.value == 'year') {
		term = term * 12;
		console.log(term + " yt");
	}

	let mainDebt = (loanSum / term).toFixed(2);

	for(let i = 1; i <= term; i++){
		
		

		// n = n+1;

		
		// p = parseFloat((loanSum - (b * n)) * ((rate/12)/100)).toFixed(2);
		
		// result = (parseFloat(p) + parseFloat(b)).toFixed(2);
		
	
	  
		percent = ((loanSum * (rate/100))/12).toFixed(2);
		
		paymentSum = (parseFloat(percent) + parseFloat(mainDebt)).toFixed(2);
	 	loanSum = parseFloat(loanSum - mainDebt).toFixed(2);
		
		// a+= parseFloat(result);
		// result = loanSum * rate/100 * 31/365;
		a+=parseFloat(paymentSum);
		p+=parseFloat(percent);

		if (loanSum<0) {
			loanSum = 0;
		}

		str += `<tr><td>${i}</td><td>${loanSum}</td><td>${percent}</td><td>${mainDebt}</td><td>${paymentSum}</td></tr>`;
	
		// console.log(i);
		// console.log(loanSum);
		// console.log(p);
		// console.log(b);
		
	}
	// }	// console.log(p +" "+ b);
	
	console.log(a +" a");
	str += '</table>';
	table.innerHTML = str;
	total.innerHTML = a.toFixed(2);
	op.innerHTML = p.toFixed(2);

	let myChart = document.getElementById('myChart').getContext('2d');

	if(window.bar != undefined) 
	window.bar.destroy(); 
	window.bar = new Chart(myChart, {	type:'bar',
		data:{
			labels:['ВЗЯВ', 'ВИПЛАЧУ'],
			datasets:[{
				label:'GRAPH',
				data:[
					document.getElementById('sum').value,
					a
				]
			}]
		},
		options:{
			scales: {
        	yAxes: [{
       		ticks: {
                beginAtZero: true
        }
        }]
    	}}});
	
}

function setCurrentDate(){

	field.value = paymentDate;
}
setCurrentDate(); 


function annuitet(){
	let term = document.getElementById('term').value;
	let loanSum = document.getElementById('sum').value;
	let rate = document.getElementById('interest').value;
	let p = 0;
	let I = 0;
	let left = 0;
	let body = 0;
	let table = document.querySelector('.result');
	let str = '<table><tr><th>Місяць</th><th>Заборгованість</th><th>Відсоток</th><th>Основний борг</th><th>Сума платежу</th></tr>';
	let psum = 0;
	let isum = 0;

	// let top = ((rate/100)/12) *Math.pow((1 + ((rate/100)/12)), term);
	// let bottom = Math.pow((1 + ((rate/100)/12)), term) - 1;
	// let k = top / bottom;
	// let result = 0;
	// result = k * loanSum;
	// console.log(result);
	rate = rate/100/12;
	p = (loanSum * (rate + (rate)/(Math.pow((1 + rate), term) - 1))).toFixed(2);
	for(let i= 1; i <= term; i++){
	console.log(i);	
	
	
	console.log(p);
	I = (loanSum * rate).toFixed(2);
	console.log(I);

	body = (p - I).toFixed(2);
	console.log(body);

	loanSum = (loanSum - body).toFixed(2);
	console.log(loanSum);

	psum+=parseFloat(p);
	isum+=parseFloat(I);

	str += `<tr><td>${i}</td><td>${loanSum}</td><td>${I}</td><td>${body}</td><td>${p}</td></tr>`;
	
	
	// console.log(loanSum);

	}

	str += '</table>';
	table.innerHTML = str;
	total.innerHTML = psum.toFixed(2);
	op.innerHTML = isum.toFixed(2);

	let myChart = document.getElementById('myChart').getContext('2d');

	if(window.bar != undefined) 
	window.bar.destroy(); 
	window.bar = new Chart(myChart, {	type:'bar',
		data:{
			labels:['ВЗЯВ', 'ВИПЛАЧУ'],
			datasets:[{
				label:'GRAPH',
				data:[
					document.getElementById('sum').value,
					psum
				]
			}]
		},
		options:{
			scales: {
        	yAxes: [{
       		ticks: {
                beginAtZero: true
        }
        }]
    	}}});


}

button.onclick = function(){

	if (annDiff.value == 'ann'){
		annuitet();
		document.getElementById('loanResult').className = 'visible';	
		
	}if (annDiff.value == 'diff'){
		different();
		document.getElementById('loanResult').className = 'visible';	
	}


}