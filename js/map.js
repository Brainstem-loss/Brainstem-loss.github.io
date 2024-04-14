
$(function () {
    var apiKey='8142fa7d87384bd1988ec82d471bb6bc';
    lefttop_map();
    function lefttop_map() {
        var myMap = echarts.init(document.getElementById('mainmap'));
        let chinaDatas = [
            { name: '北京', value: -100 },
            { name: '云南', value: -100 },
            { name: '广东', value: -100 },
            { name: '台湾', value: -100 },
            { name: '黑龙江', value: -100 },
            { name: '内蒙古', value: -100 },
            { name: '吉林', value: -100 },
            { name: '辽宁', value: -100 },
            { name: '河北', value: -100 },
            { name: '天津', value: -100 },
            { name: '山西', value: -100 },
            { name: '陕西', value: -100 },
            { name: '甘肃', value: -100 },
            { name: '宁夏', value: -100 },
            { name: '青海', value: -100 },
            { name: '新疆', value: -100 },
            { name: '西藏', value: -100 },
            { name: '四川', value: -100 },
            { name: '重庆', value: -100 },
            { name: '山东', value: -100 },
            { name: '河南', value: -100 },
            { name: '江苏', value: -100 },
            { name: '安徽', value: -100 },
            { name: '湖北', value: -100 },
            { name: '浙江', value: -100 },
            { name: '福建', value: -100 },
            { name: '江西', value: -100 },
            { name: '湖南', value: -100 },
            { name: '贵州', value: -100 },
            { name: '广西', value: -100 },
            { name: '海南', value: -100 },
            { name: '上海', value: -100 },
            { name: '香港', value: -100 },
            { name: '澳门', value: -100 }
        ];
        function fetchUpdatedChinaDatas(chinaDatas) {
            return Promise.all(chinaDatas.map((item, index) => {
                return axios({
                    url: `https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${item.name}`,
                    method: 'get'
                }).then(res => {
                    return getW(res.data.location[0].id).then(temp => {
                        return { ...item, value: temp };
                    });
                });
            })).then(updatedDatas => {
                console.log(updatedDatas)
                return updatedDatas;
            }).catch(error => {
                console.error(error);
            });
            function getW(id) {
                return axios({
                    url: `https://devapi.qweather.com/v7/weather/now?key=${apiKey}&location=${id}`,
                    method: 'get'
                }).then(res => {
                    return res.data.now.temp;
                });
            }
        }
        fetchUpdatedChinaDatas(chinaDatas).then(updatedChinaDatas => {
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        console.log(params);
                        var toolTiphtml = ''
                        if (isNaN(params.value)) {
                            toolTiphtml = params.name + '温度: 0度'
                        } else {
                            toolTiphtml = params.name + '温度:' + params.value + '度'
                        }
                        return toolTiphtml;
                    }
                },
                /*                     toolbox: {
                                        feature: {
                                            saveAsImage: {}
                                        }
                                    }, */
                visualMap: {
                    show: true,
                    left: 'left',
                    top: 'bottom',
                    seriesIndex: [0],
                    type: 'piecewise',
                    pieces: [
                        { min: -20, max: -5, color: 'rgb(123,123,171)' },
                        { min: -4, max: 5, color: 'rgb(141,193,220)'  },
                        { min: 6, max: 15, color: 'rgb(107,189,117)' },
                        { min: 16, max: 20, color: 'rgb(234,208,100)' },
                        { min: 21, max: 25, color: 'rgb(221,137,80)'},
                        { min: 26, max: 35, color: 'rgb(200,73,72)' },
                    ],
                    textStyle: {
                        color: '#ffffff'
                    }
                },

                geo: {
                    show: true,
                    map: myMap,
                    label: {
                        normal: {
                            show: true,
                            fontSize: 12,

                        },
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#FFFFFF',
                            borderColor: '#666666',
                        },
                        emphasis: {
                            areaColor: '#0099CC',
                        }
                    }
                },

                series: [{
                    type: 'map',
                    map: 'china',
                    animation: false,
                    data: updatedChinaDatas
                }]
            }
            myMap.setOption(option);
            window.addEventListener('resize', function () {
                myMap.resize();
            });


            let count_5To0 = updatedChinaDatas.filter(item => item.value >= -20 && item.value <= -5).length;
            let count1to5 = updatedChinaDatas.filter(item => item.value >= -4 && item.value <= 5).length;
            let count6to10 = updatedChinaDatas.filter(item => item.value >= 6 && item.value <= 15).length;
            let count11to15 = updatedChinaDatas.filter(item => item.value >= 16 && item.value <= 20).length;
            let count16to20 = updatedChinaDatas.filter(item => item.value >= 21 && item.value <= 25).length;
            let count21to30 = updatedChinaDatas.filter(item => item.value >= 25 && item.value <= 35).length;
            var ydata = [{ name: '-20 ~ -5', value: count_5To0 },
            { name: '-4 ~ 5', value: count1to5 },
            { name: '6 ~ 15', value: count6to10 },
            { name: '16 ~ 20', value: count11to15 },
            { name: '21 ~ 25', value: count16to20 },
            { name: '25 ~ 35', value: count21to30 }
            ];

            var myChart = echarts.init(document.getElementById('ceshi'));
            var color = ["#7b7bab", "8dc1dc", "6bbd75", "#ead064", "#dd8950", "#c84948"]
            var xdata = ['-20 ~ -5', '-4 ~ 5', '6 ~ 15', '16 ~ 20', '21 ~ 25', '25 ~ 35'];


            option = {
                color: color,
                series: [{
                    type: 'pie',
                    clockwise: false, //饼图的扇区是否是顺时针排布
                    minAngle: 2, //最小的扇区角度（0 ~ 360）
                    radius: ["20%", "60%"],
                    center: ["30%", "45%"],
                    avoidLabelOverlap: false,
                    itemStyle: { //图形样式
                        normal: {
                            borderColor: '#ffffff',
                            borderWidth: 1,
                        },
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            formatter: '{text|{b}}\n{c} ({d}%)',
                            rich: {
                                text: {
                                    color: "#fff",
                                    fontSize: 14,
                                    align: 'center',
                                    verticalAlign: 'middle',
                                    padding: 8
                                },
                                value: {
                                    color: "#8693F3",
                                    fontSize: 24,
                                    align: 'center',
                                    verticalAlign: 'middle',
                                },
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: 20,
                            }
                        }
                    },
                    data: ydata
                }]
            };
            myChart.setOption(option);
            myChart.on('click', function (param) {
                alert("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                setTimeout(function () {
                    location.href = "#";
                }, 20000);
            });
            setTimeout(function () {
                myChart.on('mouseover', function (params) {
                    if (params.name == ydata[0].name) {
                        myChart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    } else {
                        myChart.dispatchAction({
                            type: 'downplay',
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    }
                });

                myChart.on('mouseout', function (params) {
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            }, 1000);

            myChart.currentIndex = -1;

            setInterval(function () {
                var dataLen = option.series[0].data.length;
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: myChart.currentIndex
                });
                myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: myChart.currentIndex
                });
            }, 1000);

            window.addEventListener("resize", function () {
                myChart.resize();
            });
        });
    }
})
