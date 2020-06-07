var s = 0;
var d = document.getElementById("depositDate");
var everyMonthYear = document.getElementById("typeOfRefill");
var p = document.getElementById("sum");
var i = document.getElementById("rate");
var sp = 0;
var field = document.querySelector('#today');
var r = document.getElementById("selectId");
// var end = document.querySelector('#depositDate')
var date = new Date();
var button = document.getElementById("cnt");
var md;
var o = document.querySelector("#firstSum");
var fs = document.querySelector("#finalSum");
var fr = document.querySelector("#finalResult");
var rs = document.getElementById("refSum");
var newP = 0;
var write = document.getElementsByClassName("resSum");
var write2 = document.getElementsByClassName("income");
var write3 = document.getElementsByClassName("total");
var nd = 0;
var checkBox2 = document.getElementById("cp");
var currencySigh = document.getElementById("currency");
var ued;
var allRefills = document.querySelector("#sumOfAllRefills");
var eSum = document.querySelector("#endSum");
var entRate = document.querySelector("#interestRate");
var depTerm = document.querySelector("#depositTerm");
var option = document.querySelector('#option');

 	function opt(){
 	if (option.value === 'standart'){
 		i.value = 12;
 		d.value = 12;
 		
 	}
 	if (option.value === 'quick') {
 		i.value = 10;
 		d.value = 5;
 	
 	}

}




//Встановлення сьогоднішньої дати на календарі
function setCurrentDate(){


	field.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);
}
setCurrentDate(); 

function checking() {

	var checkBox = document.getElementById("checkB");
	

	if (checkBox.checked == true){
	document.getElementById("refillInputs").className = "visible2";
	}
	else{
	document.getElementById("refillInputs").className = "invisible";
	}
	
}
//Функція розрахунку відсотків без додаткових умов
function first(){
	var g = 0;
	var psp = 0;
	var res = 0;
	let table = document.querySelector(".table");
	let str = "<table><tr><th>Місяць</th><th>Кількість днів</th><th>Тіло вкладу</th><th>Прибуток</th><th>Разом</th></tr>";
	

	currencyValue();
	for(j = 0; j < parseInt(d.value, 10) || j < parseInt(nd, 10); j++){

	var n = (field.valueAsDate.getMonth()+1)+j;
		while (!((n - 12) <= 0)) {
    	n -= 12;
		}
	
	daysInMonth(n);

	str += `<tr><td>${j+1}</td><td>${md}</td><td>${p.value}</td>`;

	sp = (p.value*i.value*md)/(365*100);
	str += `<td>${sp.toFixed(2)}</td><td>${parseInt(sp, 10)+parseInt(p.value, 10)}</td></tr>`;
	res = parseInt(p.value, 10) + parseInt(sp, 10);
	g+=sp;
	
	console.log(parseInt(p.value, 10));
	console.log(parseInt(sp, 10));
	console.log(md);
	
	}
	let oinner = parseInt(g.toFixed(2), 10);
	str += "</table>";
	table.innerHTML = str;
	psp = parseInt(p.value, 10) + parseInt(g, 10);
	console.log(psp);
	o.innerHTML = p.value +" "+ued; 
	fs.innerHTML = oinner.toFixed(2)+" "+ued;
	fr.innerHTML = psp.toFixed(2) +" "+(ued);
	allRefills.innerHTML = 0.00;
	eSum.innerHTML = p.value+" "+ued;
	entRate.innerHTML = i.value+"%";
	if(r.value == 'mnth'){
	depTerm.innerHTML = d.value+" мес.";
	}else{
	depTerm.innerHTML = nd+" мес.";	
	}
	console.log(g);

	let myChart = document.getElementById('myChart').getContext('2d');

	if(window.bar != undefined) 
	window.bar.destroy(); 
	window.bar = new Chart(myChart, {	type:'bar',
		data:{
			labels:['ВКЛАВ', 'ОТРИМАЮ'],
			datasets:[{
				label:'GRAPH',
				data:[
					p.value,
					psp
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
		
//Функція розрахунку при умові поповнення вкладу
function second (){	

	var p = document.getElementById("sum").value;
	var g = 0;
	var y = 0;
	var res = 0;
	var psp = 0;
	var checkBox = document.getElementById("checkB");
	var z = p;
	var nres = 0;
	let table = document.querySelector(".table");
	let str = "<table><tr><th>Місяць</th><th>Кількість днів</th><th>Тіло вкладу</th><th>Прибуток</th><th>Разом</th></tr>";
	var nres2 = 0;
	currencyValue()

	for (let j = 0; j < parseInt(d.value, 10) || j < parseInt(nd, 10); j++){
		var n = (field.valueAsDate.getMonth()+1)+j;

		while (!((n - 12) <= 0)) {
    	n -= 12;
		}
		daysInMonth(n);


		y++;
		console.log(y + "= y");
		//Щорічне поповнення 
		if (everyMonthYear.value == "eYear") {

			str += `<tr><td>${j+1}</td><td>${md}</td><td>${p}</td>`;
			sp = (p*i.value*md)/(365*100);
			str += `<td>${sp.toFixed(2)}</td><td>${parseInt(sp, 10)+parseInt(p, 10)}</td></tr>`;
			
			console.log(sp);

			res = parseInt(p, 10) + parseInt(sp, 10);
			nres2 +=parseInt(rs.value, 10);
			g+=sp;

			console.log(parseInt(p, 10));
			console.log(res);	
			
			console.log(md);

			if (y%12 == 0){
			
			if(checkBox.checked == true && cp.checked == true){
				p = parseInt(p, 10) + parseInt(rs.value, 10) + parseInt(sp, 10);
			}else{
				p = parseInt(p, 10) + parseInt(rs.value, 10); 
			}

		}

		}else{
		//Щомісячне поповнення
		str += `<tr><td>${j+1}</td><td>${md}</td><td>${p}</td>`;
		sp = (p*i.value*md)/(365*100);
		str += `<td>${sp.toFixed(2)}</td><td>${parseInt(sp, 10)+parseInt(p, 10)}</td></tr>`;
		console.log(sp);
		res = parseInt(p, 10) + parseInt(sp, 10);
		nres +=parseInt(rs.value, 10);

		g+=sp;	
		
		console.log(parseInt(p, 10));
		console.log(res);
		
		if(checkBox.checked == true && cp.checked == true){
				p = parseInt(p, 10) + parseInt(rs.value, 10) + parseInt(sp, 10);
			}else{
				p = parseInt(p, 10) + parseInt(rs.value, 10);
			}

		console.log(md);
	
	}
}

	str += "</table>";
	table.innerHTML = str;
	console.log(nres);
	
	var finalRes = p + g;

	let nz = (parseInt(z, 10) + parseInt(nres, 10)) - rs.value;
	psp = parseInt(nz, 10) + parseInt(g, 10);
	o.innerHTML = z +" "+ued; 
	fs.innerHTML = g.toFixed(2)+" "+ued;
	fr.innerHTML = psp.toFixed(2) +" "+ued;
	allRefills.innerHTML = parseInt(nres, 10) - rs.value+" "+ued;
	eSum.innerHTML = parseInt(z, 10) + (parseInt(nres, 10) - rs.value)+" "+ued;
	entRate.innerHTML = i.value+"%";
	if(r.value == 'mnth'){
	depTerm.innerHTML = d.value+" мес.";
	}else{
	depTerm.innerHTML = nd+" мес.";	
	}
	console.log(g);
	console.log(res.toFixed(2));
	if (everyMonthYear.value == "eYear"){
		allRefills.innerHTML = parseInt(p, 10) - parseInt(z, 10)+" "+ued;
		fr.innerHTML = (finalRes).toFixed(2) - rs.value+" "+ued;
		eSum.innerHTML = (p).toFixed(2)+" "+ued;
		allRefills.innerHTML = ((p - rs.value) - z).toFixed(2)+" "+ued;
	}
	let capRefill = parseInt(z, 10) + parseInt(allRefills, 10) + parseInt(g, 10);
	if(checkBox.checked == true && cp.checked == true){
		fr.innerHTML == parseInt(capRefill, 10)+" "+ued;

	}

	let myChart = document.getElementById('myChart').getContext('2d');

	if(window.bar != undefined) 
	window.bar.destroy(); 
	window.bar = new Chart(myChart, {	type:'bar',
		data:{
			labels:['ВКЛАВ', 'ОТРИМАЮ'],
			datasets:[{
				label:'GRAPH',
				data:[
					z,
					psp
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
//Функція, яка дозволяє враховувати кількість днів для кожного місяця
function daysInMonth (sv){
		switch(sv){

			case 1: md = 31;
			break;
			case 2: md = 29;
			break;
			case 3: md = 31;
			break;
			case 4: md = 30;
			break;
			case 5: md = 31;
			break;
			case 6: md = 30;
			break;
			case 7: md = 31;
			break;
			case 8: md = 31;
			break;
			case 9: md = 30;
			break;
			case 10: md = 31;
			break;
			case 11: md = 30;
			break;
			case 12: md = 31; 
			break;

		}

}
//Функція натиснення на кнопку "Розрахувати"
button.onclick = function(){

	var checkBox = document.getElementById("checkB");


	if(r.value == 'mnth'){

		nd = 0;
		daysInMonth(field.valueAsDate.getMonth()+1);

	} else{

		 nd = d.value * 12;

	}
	
	
		
	if (cp.checked == true && checkBox.checked == false){
		capitalisation();
		document.getElementById("result").className="visible";
	}if (checkBox.checked == false && cp.checked == false){
		first();
		document.getElementById("result").className="visible";

	}


	
		if (checkBox.checked == true){
		second();
		document.getElementById("result").className="visible";
	}

	// chart();
	
}

let seal = document.querySelector('#seal');

seal.onclick = function(){
	document.getElementById("result").className="invisible";
}



function currencyValue(){
	switch(currencySigh.value){

		case 'uah': ued = "(грн)";
		break;
		case 'euro': ued = "(євро)";
		break;
		case 'usd': ued = "(дол)";

	}
}

//Функція, яка дозворяє рахувати відсотки, враховуючи капіталізацію
 function capitalisation(){
 	currencyValue();
 	let p = document.getElementById("sum").value;
 	var g = 0;
 	o.innerHTML = p +" "+ued; 
 	let capFinalSum = p;
 	let z = p;
 	let table = document.querySelector(".table");
	let str = "<table><tr><th>Місяць</th><th>Кількість днів</th><th>Тіло вкладу</th><th>Прибуток</th><th>Разом</th></tr>";

 	for(let j = 0; j < parseInt(d.value, 10) || j < parseInt(nd, 10); j++){

 		var n = (field.valueAsDate.getMonth()+1)+j;
		while (!((n - 12) <= 0)) {
    	n -= 12;
		}
		daysInMonth(n);

 		 console.log(p);
 		 str += `<tr><td>${j+1}</td><td>${md}</td><td>${p}</td>`;
 		 
 		 sp = (p*i.value*md)/(365*100);

 		 str += `<td>${sp.toFixed(2)}</td><td>${parseInt(sp, 10)+parseInt(p, 10)}</td></tr>`;

 		 console.log(sp);

 		 p = parseInt(p, 10) + parseInt(sp, 10);
 		 

 		 console.log(md);

 		 g+=sp;
 }
 		let frInner = parseInt(z, 10) + parseInt(g, 10);
		str += "</table>";
		table.innerHTML = str;
 		eSum.innerHTML = z+" "+ued;
		fs.innerHTML = g.toFixed(2)+" "+ued;
		fr.innerHTML = frInner.toFixed(2)+" "+(ued);
		allRefills.innerHTML = 0;
		entRate.innerHTML = i.value+"%";
		if(r.value == 'mnth'){
		depTerm.innerHTML = d.value+" мес.";
		}else{
		depTerm.innerHTML = nd+" мес.";	
		}

		let myChart = document.getElementById('myChart').getContext('2d');

		if(window.bar != undefined) 
		window.bar.destroy(); 
		window.bar = new Chart(myChart, {	type:'bar',
		data:{
			labels:['BEFORE', 'AFTER'],
			datasets:[{
				label:'GRAPH',
				data:[
					z,
					frInner
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




// function chart() {
// 	let myChart = document.getElementById('myChart').getContext('2d');
	

// 	let beforeAfter = new Chart(myChart, {
// 		type:'bar',
// 		data:{
// 			labels:['BEFORE', 'AFTER'],
// 			datasets:[{
// 				label:'STATISTIC',
// 				data:[
// 					z,
// 					fr
// 				]
// 			}]
// 		},
// 		options:{}
// 	});
// }


	
// 	var p = document.getElementById("sum").value;
// 	var g = 0;
// 	var y = 0;
// 	var res = 0;
// 	var psp = 0;


// 	// for (let j = 0; j < parseInt(d.value, 10) || j < parseInt(nd, 10); j++){
// 	// 	var n = (field.valueAsDate.getMonth()+1)+j;
// 	// 	// console.log(n + 'asad');
// 	// 	while (!((n - 12) <= 0)) {
//  //    	n -= 12;
//  //    	// console.log(n + 'asad');
// 	// 	}
// 	// 	daysInMonth(n);

// 	// 	y++;
// 	// 	if (y = 1) {
// 	// 	sp = (p*i.value*md)/(365*100);
// 	// 	res = parseInt(p, 10) + parseInt(sp, 10);
// 	// 	console.log(parseInt(res, 10));
// 	// 	console.log(parseInt(p, 10) + " cp");
// 	// 	console.log(sp + " cp");
// 	// 	// console.log(parseInt(res, 10));

// 	// }else{

// 	// 	sp =  (res*i.value*md)/(365*100);
// 	// 	res = parseInt(p, 10) + parseInt(sp, 10);
		
// 	// 	// p = res;
		
// 	// 	// console.log(parseInt(p, 10) + " cp");
// 	// 	console.log(sp + " cp");
// 	// 	console.log(md + " cp");
// 	// 	console.log(parseInt(res, 10));
// 	// }

// 	sp = p*Math.pow((1+(i*md/365*100), nd));
// 		console.log(sp)

// 	}


