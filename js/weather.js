$(function () {
  // 获取天气信息
  weather()
})

// 初始化天气数据
function get_weather(data, source = 'pc', weather_type = 'observe|forecast_1h|forecast_24h|index|alarm|limit|tips|air|rise', callback = '') {
  var address = data.split(',')
  var province = address[0]
  var city = address[1]
  $.ajax({
    url: 'https://wis.qq.com/weather/common',
    type: 'get',
    data: {
      source: source,
      weather_type: weather_type,
      province: province,
      city: city
    },
    dataType: 'jsonp',
    success: function (res) {
      if (res.status == 200 && res.data) {
        //当前天气
        var observe = res.data.observe
        var air = res.data.air;
        var forecast_24h = res.data.forecast_24h;
        $('#weather-weather').html(observe.weather)
        $('#weather-pressure').html(observe.pressure)
        $('#weather-temp').html(observe.degree)
        $('#weather-wind_power').html(observe.wind_power)
        $('#weather-humidity').html(observe.humidity)
        $('#weather-maxtemp').html(forecast_24h['1'].max_degree)
        $('#weather-mintemp').html(forecast_24h['1'].min_degree)
        $('#weather-pm').html(air['pm2.5'])
        $('#weather-air').html(air.aqi)
        $('#weather-airname').html(air.aqi_name)
        $(".weather-centerbox2").empty()
        for (let i in Object.keys(forecast_24h)) {
          if (i == 0) continue
          var data = forecast_24h[i]
          var timearr = data.time.split('-')
          timearr.shift()
          var time = timearr.join('/')
          $('.weather-centerbox2').append(`
          <div class="weather-centerboxitem2" id="weather${i}">
          <div><span>${time}</span></div>
          <div><span>${data.day_weather}</span></div>
          <div class="dayWather"></div>
          <div><span>↑</span><span>${data.max_degree}</span><span>℃</span></div>
          <div><span>${data.day_wind_direction}</span></div>
          <div><span>${data.day_wind_power}</span><span>级</span></div>
         </div>
          `)
          switch (data.day_weather) {
            case '晴':
              $(`#weather${i} .dayWather`).html(`<img src="./image/fine.png">`);
              break
            case '阴':
              $(`#weather${i} .dayWather`).html(`<img src="./image/cloudy.png">`);
              break
            case '多云':
              $(`#weather${i} .dayWather`).html(`<img src="./image/partly-cloudy.png">`);
              break
            case '阵雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/shower.png">`);
              break
            case '雷阵雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/thundershower.png">`);
              break
            case '雷阵雨伴有冰雹':
              $(`#weather${i} .dayWather`).html(`<img src="./image/thunderstorm.png">`);
              break
            case '雨夹雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/sleet.png">`);
              break
            case '小雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/sprinkle.png">`);
              break
            case '中雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/moderate.png">`);
              break
            case '大雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/heavy.png">`);
              break
            case '暴雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/rainstorm.png">`);
              break
            case '大暴雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/downpour.png">`);
            case '特大暴雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/rainstormTwo.png">`);
              break
            case '阵雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/snow.png">`);
              break
            case '小雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/light.png">`);
              break
            case '中雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/moderate-snow.png">`);
              break
            case '大雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/heavy-snow.png">`);
              break
            case '暴雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/blizzard.png">`);
              break
            case '雾':
              $(`#weather${i} .dayWather`).html(`<img src="./image/fog.png">`);
              break
            case '冻雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/ice-rain.png">`);
              break
            case '沙尘暴':
              $(`#weather${i} .dayWather`).html(`<img src="./image/sand-storm.png">`);
              break
            case '小到中雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/Small-moderate.png">`);
              break
            case '中到大雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/heavy-rain.png">`);
              break
            case '大到暴雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/torrential-rain.png">`);
              break
            case '暴雨到大暴雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/rainstormTwo.png">`);
              break
            case '大暴雨到特大暴雨':
              $(`#weather${i} .dayWather`).html(`<img src="./image/torrential-rain.png">`);
              break
            case '小到中雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/moderate-snowTwo.png">`);
              break
            case '中到大雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/heavy-snowTwo.png">`);
              break
            case '大到暴雪':
              $(`#weather${i} .dayWather`).html(`<img src="./image/snow.png">`);
              break
            case '浮尘':
              $(`#weather${i} .dayWather`).html(`<img src="./image/floating-dust.png">`);
              break
            case '扬沙':
              $(`#weather${i} .dayWather`).html(`<img src="./image/sand-blowing.png">`);
              break
            case '强沙尘暴':
              $(`#weather${i} .dayWather`).html(`<img src="./image/strong-sandstorm.png">`);
              break
            case '霾':
              $(`#weather${i} .dayWather`).html(`<img src="./image/haze.png">`);
              break
            default:
              '出错了天气'
          }
        }
      }
    }
  });
}
//天气方法
function weather() {  
  let button = document.querySelector('button');  
  let input = document.querySelector('input');  
  let cityNameElement = document.querySelector('.weather-cityname');  
  let initialCity = '上海市';    
  setCityAndWeather(initialCity);  
  
  button.addEventListener('click', function () {  
    let city = input.value.trim(); 
    setCityAndWeather(city);  
  });  
  
  function setCityAndWeather(city) {  
    if (city) {  
      cityNameElement.textContent = city;   
      $.ajax({  
        url: 'https://wis.qq.com/city/like',  
        type: 'get',  
        data: {  
          source: 'pc',  
          city: city,  
        },  
        dataType: 'jsonp',  
        success: function (res) {  
          if (res.status == 200) {  
            for (var key in res.data) {  
              get_weather(res.data[key]);  
            }  
          }  
        }  
      });  
    } else {  
      alert('请输入有效的城市名称！');  
    }  
  }  
}  

window.onload = weather;




