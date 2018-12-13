const monitor = require('./monitor');

// 语音播报
function speech(text) {
    $text.speech({
        text: text,
        rate: 0.5,
        language: "zh-CN", // optional
    })
}

// 时间转换
var sec_to_time = function(s) {
    var t;
    if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;
        if(hour < 10) {
            t = '0'+ hour + ":";
        } else {
            t = hour + ":";
        }

        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec.toFixed(0);
    }
    return t;
}
// 锻炼用时⌛  ️
var time = 0;

var Time = '';
// 开始计时⌛️
function SetTime() {
    Time = setInterval(function () {
        time++;
        $("time").text = sec_to_time(time);
    }, 1000)
}

// 计时器是否为暂停状态
var suspend = false
// 开始锻炼
function Start() {
    if (time === 0) {
        $("start").title = '暂停'
        SetTime()
        StartMonitor()
        $ui.toast("锻炼开始")
        $("time").hidden = false
    } else {
        suspend = !suspend;       
        if (suspend === true) {
            $("start").title = '继续'
            $("stop").hidden = false
            clearInterval(Time);
            StopMonitor()
        }else{
            $("start").title = '暂停'
            $("stop").hidden = true
            SetTime()
            StartMonitor()
        }
    }
}

// 结束锻炼
function Stop() {
    $ui.toast("锻炼结束") 
    time = 0;
    suspend = false;
    StopMonitor() //结束传感器监听
    clearInterval(Time); //移除计时
    $("number").text = "0"
    $("time").text = ""
    $("start").title = '开始'
    $("stop").hidden = true
    $("time").hidden = true
}

// 开始传感器监听
function StartMonitor() {
    monitor.setProximityMonitorEnabled(true, state => {
        if (state === true) {
            let number = Number($("number").text) + 1
            $("number").text = number
            speech(number)
        }
    });
}

// 结束传感器监听
function StopMonitor() {
    monitor.setProximityMonitorEnabled(false);
}

module.exports = {
    Start: Start,
    Stop: Stop,
    StopMonitor: StopMonitor
}