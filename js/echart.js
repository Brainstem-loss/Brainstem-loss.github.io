$(function () {
    var apiKey='8142fa7d87384bd1988ec82d471bb6bc';
    ceshi2();

    function ceshi2() {
        let button = document.querySelector('button')
        let input = document.querySelector('input')
        let city = input.value;
        function getW(id) {
            axios({
                url: `https://devapi.qweather.com/v7/weather/24h?key=${apiKey}&location=${id}`,
                method: 'get'
            }).then(res => {
                console.log(res)
                let charAdate = res.data.hourly.slice(0, 12).map(item => {  
                    const fxTimeStr = item.fxTime;   
                    const datePart = fxTimeStr.substring(0, 10);  
                    const timePart = fxTimeStr.substring(11, 16);  
                    return `${datePart} ${timePart}`;  
                });
                let temp = res.data.hourly.slice(0, 12).map(item => item.temp);
                let windSpeed = res.data.hourly.slice(0, 12).map(item => item.windSpeed);
                let precip = res.data.hourly.slice(0, 12).map(item => item.humidity);
                let uvIndex = res.data.hourly.slice(0, 12).map(item => item.cloud);
                var myChart = echarts.init($("#ceshi2")[0]);
                option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {  
                            let result = '';  
                            result += `时间: ${params[0].name}<br/>`
                            params.forEach(function(param) {  
                                let unit = '';  
                                switch (param.seriesName) {  
                                    case '气温':  
                                        unit = '℃';  
                                        break;  
                                    case '风速':  
                                        unit = 'm/s';  
                                        break;  
                                    case '湿度':  
                                        unit = '%';  
                                        break;  
                                    case '云量':  
                                        unit = '%';  
                                        break;   
                                }  
                                result += `${param.seriesName}: ${param.value}${unit}<br/>`;  
                            });  
                            return result;  
                        }  
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                        }
                    },
                    grid: {
                        top: 'middle',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    legend: {
                        data: ['气温', '风速', '湿度', '云量'],
                        textStyle: {
                            color: "#fff"
                        }

                    },
                    xAxis: [{
                        type: 'category',
                        data: charAdate,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#ebf8ac"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#01FCE3'
                            }
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %',
                            textStyle: {
                                color: "#fff"
                            }
                        }
                    }
                    ],
                    series: [

                        {
                            name: '气温',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 5,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#8ea5c8"
                                    },
                                    {
                                        offset: 1,
                                        color: "#7e95b8"
                                    }
                                    ])
                                }
                            },
                            data: temp
                        },
                        {
                            name: '风速',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 5,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#a17db4"
                                    },
                                    {
                                        offset: 1,
                                        color: "#916da4"
                                    }
                                    ])
                                }
                            },
                            data: windSpeed,
                        },
                        {
                            name: '湿度',
                            type: 'line',
                            yAxisIndex: 1,
                            data: precip,
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#d4d4d4'
                                        },
                                        {
                                            offset: 0.4,
                                            color: '#dfdfdf'
                                        }, {
                                            offset: 1,
                                            color: '#e4e4e4'
                                        }
                                        ],
                                        globalCoord: false
                                    },
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c4c4c4',
                                    borderWidth: 10,
                                    borderColor: "#c4c4c4"
                                }
                            },
                            smooth: true,
                        },
                        {
                            name: '云量',
                            type: 'line',
                            yAxisIndex: 1,
                            data: uvIndex,
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#b3d6ad'
                                        },
                                        {
                                            offset: 0.4,
                                            color: '#bedfb8'
                                        }, {
                                            offset: 1,
                                            color: '#e8f8c4'
                                        }
                                        ],
                                        globalCoord: false
                                    },
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#a3c69d',
                                    borderWidth: 10,
                                    borderColor: "#a3c69d"
                                }
                            },
                            smooth: true,
                        }
                    ]
                };

                myChart.setOption(option);
                window.addEventListener('resize', function () {
                    myChart.resize();
                })
            })
        }
        button.addEventListener('click', function () {
            city = input.value;
            axios({
                url: `https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${city}`,
                method: 'get'
            }).then(res => {
                getW(res.data.location[0].id)
            })
        })
        window.onload = function () {
            getW("101020100");
        };
    }

})
