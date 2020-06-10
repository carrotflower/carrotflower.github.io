

let myChart = document.getElementById('myChart').getContex('2d');

 	let beforeAfter = new Chart(myChart, {
 		type:'bar',
 		data:{
 			labels:['Boston', 'Springfield'],
 			datasets:[{
 				label:'Population',
 				data:[
 					21312,
 					12322
 				]
 			}]
 		},

 		options:{}

 	})