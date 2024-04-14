var apiKey = '8142fa7d87384bd1988ec82d471bb6bc'; // 替换为你的和风天气API密钥
$(document).ready(function () {

  cityID = {};
  // 检查是否是第一次打开网页
  if (localStorage.getItem('cityArray') === null) {
      // 如果是第一次打开网页，创建一个对象并存储到localStorage
      cityID = { 北京: '101010100', 上海: '101020100'}
      localStorage.setItem('cityArray', JSON.stringify(cityID));
  }
  else {
      // 如果不是第一次打开网页，从localStorage中获取之前存储的对象
      cityID = JSON.parse(localStorage.getItem('cityArray'));
    }
      $.each(cityID, function (key, value) {
                    var city_id = value;
                    var city_name=key;
                    var apiUrl = `https://devapi.qweather.com/v7/weather/3d?location=${city_id}&key=${apiKey}`;
                    $.get(apiUrl, function (data) {
                        var fxDate  = data["daily"][0]["fxDate"];//日期
                        var precip  = data["daily"][0]["precip"];//降雨量
                        var humidity=data["daily"][0]["humidity"];//湿度
                        var windSpeedDay=data["daily"][0]["windSpeedDay"];//风速
                        var uvIndex  = [data["daily"][0]["uvIndex"],data["daily"][1]["uvIndex"],data["daily"][2]["uvIndex"]];// 紫外线
                        var textDay = [data["daily"][0]["textDay"],data["daily"][1]["textDay"],data["daily"][2]["textDay"]];//天气状况
                        var tempMin = [data["daily"][0]["tempMin"],data["daily"][1]["tempMin"],data["daily"][2]["tempMin"]];//低温
                        var tempMax = [data["daily"][0]["tempMax"],data["daily"][1]["tempMax"],data["daily"][2]["tempMax"]];//高温
                        var newDiv=`
                        <div class="container" id="${city_name}" >
                        <div class="weather-side">
                          <div class="weather-gradient" id="${city_id}"></div>
                          <div class="date-container">
                            <h2 class="date-dayname">${city_name}</h2>
                            <span class="date-day">${fxDate}</span>
                            <i class="location-icon" data-feather="map-pin"></i>
                            <span class="location"></span>
                          </div>
                          <div class="weather-container">
                            <i class="weather-icon" data-feather="sun"></i>
                            <h1 class="weather-temp">${tempMax[0]}°C</h1>
                            <h3 class="weather-desc">${textDay[0]}</h3>
                          </div>
                        </div>
                        <div class="info-side">
                        <span class="x" id="${city_name}">DEL</span>
                          <div class="today-info-container">
                            <div class="today-info">
                              <div class="precipitation">
                                <span class="title">降水</span>
                                <span class="value">${precip} mm</span>
                                <div class="clear"></div>
                              </div>
                              <div class="humidity">
                                <span class="title">湿度</span>
                                <span class="value">${humidity} %</span>
                                <div class="clear"></div>
                              </div>
                              <div class="wind">
                                <span class="title">风速</span>
                                <span class="value">${windSpeedDay} km/h</span>
                                <div class="clear"></div>
                              </div>
                            </div>
                          </div>
                          <div class="week-container">
                            <ul class="week-list">
                              <li class="active">
                                <i class="day-icon"></i>
                                <span class="day-name">今天<br>${textDay[0]}</span>
                                <span class="day-temp">${tempMin[0]}°C<br>${tempMax[0]}°C<br><br>UV${uvIndex[0]}</span>
                              </li>
                              <li>
                                <i class="day-icon"></i>
                                <span class="day-name">明天<br>${textDay[1]}</span>
                                <span class="day-temp">${tempMin[1]}°C<br>${tempMax[1]}°C<br><br>UV${uvIndex[1]}</span>
                              </li>
                              <li>
                                <i class="day-icon"></i>
                                <span class="day-name">后天<br>${textDay[2]}</span>
                                <span class="day-temp">${tempMin[2]}°C<br>${tempMax[2]}°C<br><br>UV${uvIndex[2]}</span>
                              </li> 
                              <div class="clear"></div>
                            </ul>
                          </div>
                        </div>
                      </div>
                      `
                        $("#container").append(newDiv);
                    });
                });


  // 添加元素的函数
  $('#add_city').click(function () {
      cityname = $('#fileContent').val();
      if(cityname==''){
        alert('请输入城市名');
      }
      else{
      city_id = ""
      var u = `https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${cityname}`;
      city_name=""
      $.get(u, function (da) {
          city_id = da.location[0].id;
          // 假设要添加的元素值为 newValue
          var newValue = city_id;
        city_name=da.location[0].name;
          // 在 object 中查找是否已经存在相同的值
          var isDuplicate = false;
          $.each(cityID, function (key, value) {
              if (value === newValue) {
                  isDuplicate = true;
                  return false; // 结束循环
              }
          });

          // 如果存在相同的值，则弹出警告框
          if (isDuplicate) {
              alert("该城市已存在: " + cityname);
          } else {
              // 如果不存在相同的值，则继续添加元素到 object 中
              cityID[city_name] = newValue;
            // 将数组存储在localStorage中
      localStorage.setItem('cityArray', JSON.stringify(cityID));
            var apiUrl = `https://devapi.qweather.com/v7/weather/3d?location=${newValue}&key=${apiKey}`;
            $.get(apiUrl, function (data) {
                var fxDate  = data["daily"][0]["fxDate"];//日期
                var precip  = data["daily"][0]["precip"];//降雨量
                var humidity=data["daily"][0]["humidity"];//湿度
                var windSpeedDay=data["daily"][0]["windSpeedDay"];//风速
                var uvIndex  = [data["daily"][0]["uvIndex"],data["daily"][1]["uvIndex"],data["daily"][2]["uvIndex"]];// 紫外线
                var textDay = [data["daily"][0]["textDay"],data["daily"][1]["textDay"],data["daily"][2]["textDay"]];//天气状况
                var tempMin = [data["daily"][0]["tempMin"],data["daily"][1]["tempMin"],data["daily"][2]["tempMin"]];//低温
                var tempMax = [data["daily"][0]["tempMax"],data["daily"][1]["tempMax"],data["daily"][2]["tempMax"]];//高温
                var newDiv=`
                <div class="container" id="${city_name}">
                <div class="weather-side">
                  <div class="weather-gradient" id="${city_id}"></div>
                  <div class="date-container">
                    <h2 class="date-dayname">${city_name}</h2>
                    <span class="date-day">${fxDate}</span>
                    <i class="location-icon" data-feather="map-pin"></i>
                    <span class="location"></span>
                  </div>
                  <div class="weather-container">
                    <i class="weather-icon" data-feather="sun"></i>
                    <h1 class="weather-temp">${tempMax[0]}°C</h1>
                    <h3 class="weather-desc">${textDay[0]}</h3>
                  </div>
                </div>
                <div class="info-side">
                <span class="x" id="${city_name}">DEL</span>
                  <div class="today-info-container">
                    <div class="today-info">
                      <div class="precipitation">
                        <span class="title">降水</span>
                        <span class="value">${precip} mm</span>
                        <div class="clear"></div>
                      </div>
                      <div class="humidity">
                        <span class="title">湿度</span>
                        <span class="value">${humidity} %</span>
                        <div class="clear"></div>
                      </div>
                      <div class="wind">
                        <span class="title">风速</span>
                        <span class="value">${windSpeedDay} km/h</span>
                        <div class="clear"></div>
                      </div>
                    </div>
                  </div>
                  <div class="week-container">
                    <ul class="week-list">
                      <li class="active">
                        <i class="day-icon"></i>
                        <span class="day-name">今天<br>${textDay[0]}</span>
                        <span class="day-temp">${tempMin[0]}°C<br>${tempMax[0]}°C<br><br>UV${uvIndex[0]}</span>
                      </li>
                      <li>
                        <i class="day-icon"></i>
                        <span class="day-name">明天<br>${textDay[1]}</span>
                        <span class="day-temp">${tempMin[1]}°C<br>${tempMax[1]}°C<br><br>UV${uvIndex[1]}</span>
                      </li>
                      <li>
                        <i class="day-icon"></i>
                        <span class="day-name">后天<br>${textDay[2]}</span>
                        <span class="day-temp">${tempMin[2]}°C<br>${tempMax[2]}°C<br><br>UV${uvIndex[2]}</span>
                      </li> 
                      <div class="clear"></div>
                    </ul>
                  </div>
                </div>
              </div>
              `
                $("#container").append(newDiv);
            });
          }

      })
      $('#fileContent').val('');
    }
  })

})

$(document).on('click', '.x', function () {
  var ctname=$(this).parent().parent().attr("id");
  delete cityID[ctname];
    localStorage.setItem('cityArray', JSON.stringify(cityID));
    cityID = JSON.parse(localStorage.getItem('cityArray'));
    
  $(this).parent().parent().remove();

})

$(document).on('click', '.weather-gradient', function () {
  var ctid=$(this).attr("id");
  var ctname=$(this).parent().parent().attr("id");
  $("#ctname").empty();
  $("#ctname").append(`<div>${ctname}</div><div id="jieshi">七天内天气变化</div>`);
  var apiUrl = `https://devapi.qweather.com/v7/weather/7d?location=${ctid}&key=${apiKey}`;
  $.get(apiUrl,function(data){
    let date = [];
    let temperature=[];
    let humidity=[];
    let precip=[];
    let textDay=[];
    let iconDay=[];
    let windScaleDay=[];
for (let i = 0; i < 7; i++) {
    date.push(data["daily"][i]["fxDate"].slice(5)); // 向数组添加元素
    temperature.push(parseFloat(data["daily"][i]["tempMax"]));
    humidity.push(parseFloat(data["daily"][i]["humidity"]));
    precip.push(parseFloat(data["daily"][i]["precip"]));
    textDay.push(data["daily"][i]["textDay"]);
    iconDay.push(data["daily"][i]["iconDay"]);
    windScaleDay.push(parseFloat(data["daily"][i]["windScaleDay"]));
}

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
          data: ['降雨量', '湿度', '温度']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data: [date[0], date[1],date[2],date[3],date[4],date[5],date[6]]
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
              precip[0],precip[1],precip[2],precip[3],precip[4],precip[5],precip[6]
            ]
          },
          {
            name: '湿度',
            type: 'bar',
            yAxisIndex: 1,
            data: [
              humidity[0],humidity[1],humidity[2],humidity[3],humidity[4],humidity[5],humidity[6]
            ]
          },
          {
            name: '温度',
            type: 'line',
            yAxisIndex: 2,
            data: [temperature[0],temperature[1],temperature[2],temperature[3],temperature[4],temperature[5],temperature[6]]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      // 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


var myChart = echarts.init(document.getElementById('right-top'));
option = {
  polar: {
    radius: [10, '90%']
  },
  angleAxis: {
    max:10,
    startAngle: 75
  },
  radiusAxis: {
    type: 'category',
    data: [1,2,3,4,5,6,7]
  },
  tooltip: {},
  series: {
    type: 'bar',
    data: [windScaleDay[0],windScaleDay[1],windScaleDay[2],windScaleDay[3],windScaleDay[4],windScaleDay[5],windScaleDay[6]],
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
      
      $('#icon').empty();
      $.each(iconDay, function(i, file) {
          // 要获取的文件URL
          var fileUrl = './icons/'+file+'.svg'; // 替换为你的文件路径
          $.ajax({
              url: fileUrl, // 请求的URL
              type: 'GET', // 请求类型，这里是GET
              dataType: 'text', // 期望返回的数据类型，这里是纯文本
              success: function(data) {
                  // 请求成功时调用的函数
                  // data参数包含服务器返回的数据
                  $('#icon').append(data); // 将数据放入div中
                  var wh='32px';
                $('svg').each(function(){
                  $(this).attr('width',wh);
                   $(this).attr('height',wh);
                })
              }
      });

    })
    $.each(date,function(i,data){
      $('#icon').append(`<div class="icon_type">${data}</div>`);
    })
    $.each(textDay,function(i,data){
      $('#icon').append(`<div class="icon_type">${data}</div>`);
    })
    
  })
  
})
