var apiKey='1913a911182e4a21b074ac7b7be72cd9';
(function($) {
    $.fn.myScroll = function(options) {
        var defaults = {
            speed: 60, 
            rowHeight: 24
        };

        var opts = $.extend({}, defaults, options),
            intId = [];

        function marquee(obj, step) {

            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function() {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i) {
            var sh = opts["rowHeight"],
                speed = opts["speed"],
                _this = $(this);
            intId[i] = setInterval(function() {
                if (_this.find("ul").height() <= _this.height()) {

                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function() {
                clearInterval(intId[i]);
            }, function() {
                intId[i] = setInterval(function() {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });

    }

})(jQuery);

const data = [
    { name: '广东', value: '%', extra: ['0'] },
    { name: '江苏', value: '%', extra: ['0'] },
    { name: '山东', value: '%', extra: ['0'] },
    { name: '浙江', value: '%', extra: ['0'] },
    { name: '河南', value: '%', extra: ['0'] },
    { name: '四川', value: '%', extra: ['0'] },
    { name: '湖北', value: '%', extra: ['0'] },
    { name: '湖南', value: '%', extra: ['0'] },
    { name: '河北', value: '%', extra: ['0'] },
    { name: '上海', value: '%', extra: ['0'] },
];
async function fetchWeatherData(data) {
    for (let item of data) {
        try {
            const res = await axios({
                url: `https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${item.name}`,
                method: 'get'
            });
            const id = res.data.location[0].id;
            const res1 = await axios({
                url: `https://devapi.qweather.com/v7/weather/now?key=${apiKey}&location=${id}`,
                method: 'get'
            });
            const wind = res1.data.now.windDir;
            item.value = wind;
            const text = res1.data.now.text;
            item.extra[0] = text;
        } catch (error) {
            // 处理错误  
            console.error('Error fetching data for item:', item.name, error);
        }
    }
} 
fetchWeatherData(data).then(() => {
    console.log(data);  
    const ulElement = document.getElementById('myList'); 
    data.forEach(item => {
        const liElement = document.createElement('li');
        const divElement = document.createElement('div');
        divElement.className = 'fontInner clearfix';
        const nameSpan = document.createElement('span');
        const bElement = document.createElement('b');
        bElement.textContent = item.name;
        nameSpan.appendChild(bElement); 
        const valueSpan = document.createElement('span');
        valueSpan.textContent = item.value;
        divElement.appendChild(nameSpan);
        divElement.appendChild(valueSpan);
        item.extra.forEach(extraItem => {
            const extraSpan = document.createElement('span');
            extraSpan.textContent = extraItem; 
            divElement.appendChild(extraSpan);
        });
        liElement.appendChild(divElement);
        ulElement.appendChild(liElement);
    });
})