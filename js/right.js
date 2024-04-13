
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('right-bottom'));
const colors = ['#5470C6', '#91CC75', '#EE6666'];
// 指定图表的配置项和数据
var option = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['降雨量', '湿度', '温度'],
    textStyle: {
      color: '#fff' // 设置文字颜色为白色
  }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: [0,0,0,0,0,0,0]
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '降雨量',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} mm'
      }
    },
    {
      type: 'value',
      name: '湿度',
      position: 'right',
      alignTicks: true,
      offset: 80,
      max: 100, 
      min:0,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1],
        },
      },
      axisLabel: {
        formatter: function (value) {
          return Math.round(value) + ' %'; // 进行四舍五入并添加单位
      }
      },
    },
    {
      type: 'value',
      name: '温度',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: '降雨量',
      type: 'bar',
      data: [
        0,0,0,0,0,0,0
      ]
    },
    {
      name: '湿度',
      type: 'bar',
      yAxisIndex: 1,
      data: [
       0,0,0,0,0,0,0
      ]
    },
    {
      name: '温度',
      type: 'line',
      yAxisIndex: 2,
      data: [0,0,0,0,0,0,0]
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


var myChart = echarts.init(document.getElementById('right-top'));
option = {
  polar: {
    radius: [10, '90%']
  },
  angleAxis: {
    startAngle: 75
  },
  radiusAxis: {
    type: 'category',
    data: ['1', '2', '3', '4','5','6','7']
  },
  tooltip: {},
  series: {
    type: 'bar',
    data: [0, 0,0,0,0,0,0],
    coordinateSystem: 'polar',
    label: {
      show: true,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  }
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);