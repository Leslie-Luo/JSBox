const monitor = require('./monitor');
const animate = require('./animate');

// 锻炼用时⌛  ️
var time = 0;
// 俯卧撑个数
var number = 0;

// 语音播报
function speech(text) {
    $text.speech({
        text: text,
        rate: 0.5,
        language: "zh-CN", // optional
    })
}

// 时间转换
var sec_to_time = function (s) {
    var t;
    if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour < 10) {
            t = '0' + hour + ":";
        } else {
            t = hour + ":";
        }

        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec.toFixed(0);
    }
    return t;
}

var Time = '';
// 开始计时⌛️
function SetTime() {
    Time = setInterval(function () {
        time++;
        $("time").text = sec_to_time(time);
    }, 1000)
}
var last = 0;
// 计时器是否为暂停状态
var suspend = false
// 开始锻炼
function Start() {
    // 简陋节流函数
    if (Date.now() - last > 1000) {
        last = Date.now()
    } else {
        $ui.toast("单身20年，按得那么快")
        return false
    }
    if (time === 0) {
        SetTime()
        StartMonitor()
        $("start").title = '暂停'
        $("time").hidden = false
        $ui.toast("锻炼开始")
    } else {
        suspend = !suspend;
        if (suspend === true) {
            clearInterval(Time)
            StopMonitor()
            StopAnimate.Show()
            $("start").title = '继续'
        } else {
            SetTime()
            StartMonitor()
            StopAnimate.Hide()
            $("start").title = '暂停'
        }
    }
}

// 结束锻炼
function Stop() {
    StopAnimate.Hide()
    $ui.toast("锻炼结束")
    $push.schedule({
        title: "锻炼结束",
        body: `🎉🎉🎉\n本次锻炼: ${number} 次\n耗时: ${time} 秒\n速度: ${(number / time).toFixed(2)} 次/秒`,
        delay: 5,
        handler: function (result) {
            var id = result.id
        }
    })
    time = 0
    suspend = false
    StopMonitor() //结束传感器监听
    clearInterval(Time); //移除计时
    $("number").text = "0"
    $("time").text = ""
    $("start").title = '开始'
    $("time").hidden = true
}

const StopAnimate = {
    Show() {
        animate.animate("stop", "start", true, "top", "bottom", 20)
    },
    Hide() {
        animate.animate("stop", "start", false, "top", "bottom", 0)
    }
}

// 开始传感器监听
function StartMonitor() {
    monitor.setProximityMonitorEnabled(true, state => {
        if (state === true) {
            number = Number($("number").text) + 1
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