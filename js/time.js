function getTime() {
    var myDate = new Date();
    var myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1; 
    var myToday = myDate.getDate(); 
    var myDay = myDate.getDay(); 
    var myHour = myDate.getHours(); 
    var myMinute = myDate.getMinutes();
    var mySecond = myDate.getSeconds(); 
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var nowTime;

    nowTime = myYear + '-' + fillZero(myMonth) + '-' + fillZero(myToday) + '&nbsp;&nbsp;' + fillZero(myHour) + ':' + fillZero(myMinute) + ':' + fillZero(mySecond) + '&nbsp;&nbsp;' + week[myDay] + '&nbsp;&nbsp;';
    $('#time').html(nowTime);
};

function fillZero(str) {
    var realNum;
    if (str < 10) {
        realNum = '0' + str;
    } else {
        realNum = str;
    }
    return realNum;
}
setInterval(getTime, 1000);