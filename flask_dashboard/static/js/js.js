    // Periodically update the data for each function
$(function () {
setInterval(get_r1_data, 1000*1);
setInterval(echarts_l2, 1000*1);
setInterval(echarts_l3, 1000*1);
setInterval(echarts_c1, 1000*1);
setInterval(map, 1000*1);
setInterval(echarts_r1, 1000*1);
setInterval(echarts_r21, 1000*1);
setInterval(echarts_r22, 1000*1);
setInterval(echarts_r3, 1000*1);

// Populate year select dropdown from 2024 to 2045
$(document).ready(function() {
    var yearSelect = document.getElementById("yearSelect");
    for (var year = 2024; year <= 2045; year++) {
        var option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    }
    var currentYear = new Date().getFullYear();
    if (currentYear >= 2024 && currentYear <= 2045) {
        yearSelect.value = currentYear;
    } else {
        yearSelect.value = 2024;
    }
});

// Function to fetch r1 data based on selected year
function get_r1_data() {
    var year = $("#yearSelect").val();

	 // Send an AJAX request to fetch data for the selected year	
    $.ajax({
        url: "/l1",
        method: "GET",
        dataType: "json",
        data: { year: year },
        success: function(data) {
            if (!data) {
                $("#EV_count, #Diesel_count, #EV_emissions, #Diesel_emissions").html("No Data");
                $("#display_year").text(year);
                return;
            }

			 // If data is returned, update the UI with the data
            $("#display_year").text(year);
            $("#EV_count").html(data.EV_count ?? "N/A");
            $("#Diesel_count").html(data.Diesel_count ?? "N/A");
            $("#EV_emissions").html(data.EV_emissions ?? "N/A");
            $("#Diesel_emissions").html(data.Diesel_emissions ?? "N/A");
        },
        error: function(xhr, type, errorThrown) {
            console.error("Failed to fetch r1 data:", type, errorThrown);
            $("#EV_count, #Diesel_count, #EV_emissions, #Diesel_emissions").html("Error");
        }
    });
}

function echarts_l2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_l2'));


            $.ajax({
                url:'/l2',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {
			
						tooltip: {
							trigger: 'axis'
						},
						color: ['#03b48e', '#3893e5'],
						legend: {
						  right: '5%',
						  top: '40%',
						  orient: 'vertical',
						  textStyle: {
							  fontSize: 12,
							  color: 'rgba(255,255,255,0.7)',
						  },
						},

						radar: [{
							indicator: [{
								text: '',
								max: 150000
							}, {
								text: '',
								max: 3000
							}, {
								text: '',
								max: 100
							}, {
								text: '',
								max: 3
							}, {
								text: '',
								max: 15
							}],

							center: ['50%', '50%'],
							radius: '70%',
							startAngle: 90,
							splitNumber: 4,
							shape: 'circle',
						
							name: {
								padding:-5,
								formatter: '{value}',
								textStyle: {
									fontSize:10,
									color: 'rgba(255,255,255,.7)'
								}
							},
							splitArea: {
								areaStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							}
						}, ],
						series: [{
							name: '',
							type: 'radar',
							tooltip: {
								trigger: 'item'
							},
							data: [{
								name: 'EV',
								value: data[''],
								lineStyle: {
									normal: { 
										color:'#03b48e',
										width:2,
									}
								},
								areaStyle: {
									normal: {
										color: '#03b48e',
										opacity:.4
									}
								},
								symbolSize: 0,
							  
							}, {
								name: 'Diesel',
								value: data[''],
								symbolSize: 0,
								lineStyle: {
									normal: { 
										color:'#3893e5',
										width:2,
									}
								},
									 areaStyle: {
									normal: {
										color: 'rgba(19, 173, 255, 0.5)'
									}
								}
							}]
						}, ]
					};
		 


		         myChart.setOption(option);
		 
				window.addEventListener("resize",function(){
					myChart.resize();
				});


                }
            })




		}

// Fetches data and renders a smooth line chart comparing EV and Diesel trends.
function echarts_l3() {

        var myChart = echarts.init(document.getElementById('echart_l3'));
        $.ajax({
                url:'/l3',
                success:function (data) {
                    // data=JSON.parse(data)
					
					var option = {
							legend: {
								icon:"circle",
								top: "0",
								width:'100%',
								right: 'center',
										itemWidth: 12,
										itemHeight: 10,
							 data: ['EV', 'Diesel'],
							 textStyle: {
								 color: "rgba(255,255,255,.5)" },
						 },
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow',
									lineStyle: {
										 color: '#dddc6b'
									 }
								 }
							},

							 xAxis: [{
							    type: 'category',
								boundaryGap: false,
								axisLabel:  {
											rotate: -45,
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
										},
									},
								axisLine: {
											lineStyle: { 
												color: 'rgba(255,255,255,.1)'
											}
								},
				  
						   data: data['index']
				  
							}, {
				  
								axisPointer: {show: false},
								axisLine: {  show: false},
								position: 'bottom',
				  
							}],
					 
						  yAxis: [
						   {
									type: 'value',
									axisTick: {show: false},
								   // splitNumber: 6,
									axisLine: {
										lineStyle: {
											color: 'rgba(255,255,255,.1)'
										}
									},
								   axisLabel:  {
									formatter: "{value}",
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
											},
										},
					
									splitLine: {
										lineStyle: {
											 color: 'rgba(255,255,255,.1)'
										}
									}
								}],
						 series: [
							 {
							 name: 'Diesel',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {
								 
								 normal: {
									 color: 'rgba(31, 174, 234, 1)',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(31, 174, 234, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(31, 174, 234, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#1f7eea',
									 borderColor: 'rgba(31, 174, 234, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['old_customer']
					 
						 }, 
					 {
							 name: 'EV',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {
								 
								 normal: {
									 color: '#6bdd9b',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#6bdd9b',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['new_customer']
					 
						 }, 
							  ]
					 
					 };

					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
		            }
		})
		
    }
// Annual data (raw data)
function echarts_c1() {

const monthlyData = [
    '23.89', '23.38', '22.85', '22.31', '21.78', 
    '21.23', '20.67', '20.10', '19.53', '18.98', 
    '18.34', '17.75', '17.13', '16.51', '43.86', 
    '57.48', '57.48', '57.47', '57.48', '57.47'
];


const yearlyData = [
    286.7, 280.5, 274.2, 267.7, 261.4,
    254.7, 248.0, 241.2, 234.3, 227.8,
    220.1, 213.0, 205.5, 198.1, 526.3,
    689.7, 689.7, 689.6, 689.8, 689.6
];

let currentIndex = 0;
// Update data every second
const interval = setInterval(() => {
    // Update monthly data (kg)
    document.getElementById("month_Reduction").textContent = monthlyData[currentIndex];
    
    // Update annual data (tons)
    document.getElementById("year_Reduction").textContent = yearlyData[currentIndex];
    
    // Cycle through the index
    currentIndex = (currentIndex + 1) % monthlyData.length;
}, 1000); // 1000ms = 1 second

}

function map() {
    // Initialize echarts instance based on the prepared DOM
		var myChart = echarts.init(document.getElementById('map_1'));
        $.ajax({
                url:'/map',
                success:function (data) {

					var data =data['data']					
					var geoCoordMap = {
						'Jakarta': [106.8650, -6.1751],
						'Surabaya': [112.7521, -7.2575],
						'Medan': [98.6789, 3.5952],
						'Bandung': [107.6191, -6.9175],
						'Bali (Denpasar)': [115.1889, -8.4095],
						'Semarang': [110.4381, -6.9904],
						'Makassar': [119.4124, -5.1477],
						'Palembang': [104.7458, -2.9761],
						'Yogyakarta': [110.3695, -7.7956],
						'Balikpapan': [116.8450, -1.2429],
						'Pekanbaru': [101.4478, 0.5071],
						'Manado': [124.8489, 1.4748],
						'Padang': [100.3638, -0.9471],
						'Malang': [112.6304, -7.9785],
						'Banjarmasin': [114.5880, -3.3194],
						'Pontianak': [109.3332, -0.0263],
						'Jayapura': [140.7031, -2.5337],
						'Kupang': [123.6070, -10.1772],
						'Tangerang': [106.6537, -6.2024],
						'Batam': [104.0305, 1.0456],
						'Mataram': [116.1078, -8.5833],
						'Ambon': [128.1814, -3.6954],
						'Sorong': [131.2936, -0.8810]	
					};
					var convertData = function (data) {
						var res = [];
						for (var i = 0; i < data.length; i++) {
							var geoCoord = geoCoordMap[data[i].name];
							if (geoCoord) {
								res.push({
									name: data[i].name,
									value: geoCoord.concat(data[i].value)
								});
							}
						}
						return res;
					};

					option = {
						title: {
							text: 'EV Emissions',
							left: 'center',
							textStyle: {
								color: 'rgba(255,255,255,0.7)',
								fontSize:18
							}
						},
						tooltip : {
							trigger: 'item',
							formatter: function (params) {
								  if(typeof(params.value)[2] == "undefined"){
									return params.name + ' : ' + params.value;
								  }else{
									return params.name + ' : ' + params.value[2];
								  }
								}
						},
					  
						geo: {
							map: 'Indonesia1',
							zoom:0.75,
							label: {
								emphasis: {
									show: false
								}
							},
							roam: false,
							itemStyle: {
								normal: {
									areaColor: '#4c60ff',
									borderColor: '#002097'
								},
								emphasis: {
									areaColor: '#293fff'
								}
							}
						},
						series : [
							{
								name: 'EV',
								type: 'scatter',
								coordinateSystem: 'geo',
								data: convertData(data),
								symbolSize: function (val) {
									return val[2] / 15;
								},
								label: {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: false
									},
									emphasis: {
										show: true
									}
								},
								itemStyle: {
									normal: {
										color: '#ffeb7b'
									}
								}
							}
							

							,


						]
					};
					
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
					

				    }
		})
		
		
}

function echarts_r1() {

        var myChart = echarts.init(document.getElementById('echart_r1'));

        $.ajax({
                url:'/r1',
                success:function (data) {
                    // data=JSON.parse(data)

					var option = {
						title: {
							x: 'center',
							y: 0,
							textStyle:{
								color:'#B4B4B4',
								fontSize:16,
								fontWeight:'normal',
							},
							
						},
						tooltip: {
							trigger: 'axis',
							backgroundColor:'rgba(255,255,255,0.2)',
							axisPointer: {
								type: 'shadow',
								label: {
									show: true,
									backgroundColor: 'rgba(255,255,255,0.7)',
								}
							}
						},
						legend: {
							textStyle: {
							  fontSize: 12,
								color: 'rgba(255,255,255,0.7)'
							},
							top:'7%',
						},
						grid:{
							x:'12%',
							width:'82%',
							y:'12%',
						},
						xAxis: {
							data: data['index'],
							splitNumber:4,
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)'
								}
							},
							
							axisLabel:  {
										rotate: -45,
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
							
							axisTick:{
								show:false,
							},
						},
						yAxis: [{
							splitLine: {show: false},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)',
									}
								},
							axisTick:{
								show:false,
								},
							axisLabel:  {
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
							},
							{
							splitLine: {show: false},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)',
								}
							},
							axisTick:{
								show:false,
								},
							axisLabel:  {
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
						}],
						
						series: [
									{
									name: 'CO2 Emissions',
									type: 'bar',
									barGap: '-100%',
									barWidth: 10,
									itemStyle: {
										normal: {
											barBorderRadius: 5,
											color: new echarts.graphic.LinearGradient(
												0, 0, 0, 1,
												[
													{offset: 0, color: 'rgba(0,254,204,0.4)'},
													// {offset: 0.2, color: 'rgba(156,107,211,0.3)'},
													{offset: 1, color: 'rgba(38,144,207,0.1)'}
												]
											)
										}
									},
									z: -12,
									
									data: data['sales']
								},
								 {
								name: 'CO₂ Emission Reduction',
								type: 'bar',
								barWidth: 10,
								itemStyle: {
									normal: {
										barBorderRadius: 5,
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: 'rgba(0,254,204,0.8)'},
												{offset: 1, color: 'rgba(38,144,207,0.8)'}
											]
										)
									}
								},
								data: data['profit']
							}, 
						  
						  
						  {
							name: 'Rate',
							type: 'line',
							smooth: true,
							showAllSymbol: true,
							symbol: 'emptyCircle',
							symbolSize: 8,
							yAxisIndex: 1,
							itemStyle: {
									normal: {
									color:'#3893e5'},
							},
							data: data['profit_rate']
						}, 
						
			 
						
			 
					   ]
					};
						
			
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				}
		})
    }	

function echarts_r21() {

        var myChart = echarts.init(document.getElementById('echart_r21'));

        $.ajax({
                url:'/r21',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {
				 grid: {
				   top: '0%',
				   bottom: '10%',
				   left:'15%',
				 },

				 yAxis: {
				   data: data['product'],
				   axisLine: {
					 show: false,
					 lineStyle: {
					   color: "rgba(255,255,255,0.7)",
					 }
				   },
				   axisTick: {
					 show: false
				   },
				   axisLabel: {
					 interval: 0,
					 fontSize: 12
				   }
				 },
				 xAxis: [
					   {show: false}
				 ],
				 series: [
				   {
					 type: "bar",
					 barWidth: "40%",
					 barGap: 5,
					 itemStyle: {
					   normal: {
						 color: new echarts.graphic.LinearGradient(1, 0, 0, 0,
						   [
							 {
							   offset: 0,
							   color: "#00fecc"
							 },
							 {
							   offset: 0.8,
							   color: "#2690cf"
							 }
						   ],
						   false
						 ),
					   },
					 },
					label: {
					  normal: {
						  show: true,
						  fontSize: 10,
						  fontWeight: 'normal',
						  color: '#ffffff',
						  position: 'right',
					  }
					},
					 data:data['sales']
				   },

				 ]
			   };

				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
			}
		})	
    }

function echarts_r22() {
        var myChart = echarts.init(document.getElementById('echart_r22'));
        $.ajax({
                url:'/r22',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {	    
					 color: [
						'rgb(255,235,0)', 'rgb(37,214,245)', 'rgb(255,0,255)'
					],
					legend: {
						y: 'top',
						top: '0%',
						data: data['type'],
						itemHeight:10,
						textStyle: {
							color: 'rgba(255,255,255,0.7)',
							fontSize: 10
						}
					},
					tooltip: {
						trigger: 'axis',
						formatter: "{a} <br/>{c} ",
						    },
					
					grid: {
					   top: '15%',
					   right:'10%',
					   bottom: '10%',
					 },
					
					xAxis: {
						  splitLine: { show: false },				
								axisTick: { show: false },
								axisLine:{show: false },
								axisLabel: { show: false },
							  },
					yAxis: {
								splitLine: { show: false },				
								axisTick: { show: false },
								axisLine:{show: false },
								axisLabel: { show: false },
							  },
					series: [
								{ name: data['type'][0],
								  symbolSize: 10,
								  data: data['data'][0],
								  type: 'scatter',
								},
								{ name: data['type'][1],
								  symbolSize: 10,
								  data: data['data'][1],
								  type: 'scatter'
								},
								{ name: data['type'][2],
								  symbolSize: 10,
								  data: data['data'][2],
								  type: 'scatter',
								　markLine: {
											symbol: 'none',
											data: [
								　　　　　　　　{
												yAxis: data['profit_avg'],
												lineStyle: {
													color: 'rgba(255,255,255,0.7)',
													type:"solid",
												},
												label:{
													formatter:'利润平均线',
													fontSize:10,
													padding: [-13, -20, 15, -45]
												}},
												{
												xAxis: data['sales_avg'],
												lineStyle: {
													color: 'rgba(255,255,255,0.7)',
													type:"solid",
												},
												label:{
													formatter:'销售额平均线',
													fontSize:10,
													
													}
											}
										  ]
									 }, 								  
								}
							  ]
							};
				 
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
		
			}
		})	
		
    }
function echarts_r3() {
        var myChart = echarts.init(document.getElementById('echart_r3'));
        $.ajax({
                url:'/r3',
                success:function (data) {
                    // data=JSON.parse(data)
					
					var option = {
					  tooltip: {
						trigger: 'axis',
						axisPointer: {
						  type: 'shadow' 
						}
					  },
					  legend: { padding:[20, 0, 0 ,0],				
						textStyle: {
									color: 'rgba(255,255,255,0.7)',
									fontSize: 10
					  }},
					  grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					  },
					  xAxis: {
							show: false
						},
					  yAxis: {
						type: '',
						data: ['', '', ''],
						axisTick: {show: false},
						axisLine:{show: false},
						axisLabel: {
								textStyle: {
									color: 'rgba(255,255,255,0.7)',
								}},
					  },
					  series: [
						{
						  name: '',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(37,214,245)'},
						  data: data['data'][0]
						},
						{
						  name: '',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(30,178,204)'},
						  data: data['data'][1]
						},
						{
						  name: '',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(7,152,179)'},
						  data: data['data'][2]
						},
					  ]
					};
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				}
				})
			

			}
	
})



function calculateDVOutput() {
    var dv_count = parseFloat(document.getElementById('dv_count').value) || 0;
    var daily_distance = parseFloat(document.getElementById('dv_daily_driving_distance').value) || 0;
    var operating_days = parseFloat(document.getElementById('dv_operating_days').value) || 0;
    var fuel_rate = parseFloat(document.getElementById('dv_fuel_consumption_rate').value) || 0;
    var carbon_factor = parseFloat(document.getElementById('dv_carbon_emission_factor').value) || 0;

    var dv_output = dv_count * daily_distance * operating_days * fuel_rate * carbon_factor  / Math.pow(10, 6);;
    document.getElementById('dv_output').innerText = 'DV Output: ' + dv_output.toFixed(2) + ' Mt CO₂';
}

function calculateEVOutput() {
    var ev_count = parseFloat(document.getElementById('ev_count').value) || 0;
    var daily_distance = parseFloat(document.getElementById('ev_daily_driving_distance').value) || 0;
    var operating_days = parseFloat(document.getElementById('ev_operating_days').value) || 0;
    var power_rate = parseFloat(document.getElementById('ev_power_consumption_rate').value) || 0;
    var carbon_factor = parseFloat(document.getElementById('ev_carbon_emission_factor').value) || 0;

    var ev_output = ev_count * daily_distance * operating_days * power_rate * carbon_factor / Math.pow(10, 6);
    document.getElementById('ev_output').innerText = 'EV Output: ' + ev_output.toFixed(2) + ' Mt CO₂';
}

$(document).ready(function(){
    $('#dv_count, #dv_daily_driving_distance, #dv_operating_days, #dv_fuel_consumption_rate, #dv_carbon_emission_factor').on('input', calculateDVOutput);
    $('#ev_count, #ev_daily_driving_distance, #ev_operating_days, #ev_power_consumption_rate, #ev_carbon_emission_factor').on('input', calculateEVOutput);
});


		


		









