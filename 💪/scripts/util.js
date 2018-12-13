const monitor = require('./monitor');

// 语音播报
function speech(text) {
    $text.speech({
        text: text,
        rate: 0.7,
        language: "zh-CN", // optional
    })
}
// 开始锻炼
function Start() {
    StopMonitor()
    $ui.toast("Start")
    $("number").text = "0"
    monitor.setProximityMonitorEnabled(true, state => {
        if (state === true) {
            let number = Number($("number").text) + 1
            $("number").text = number
            speech(number)
        }
    });
}
// 结束锻炼
function Stop() {
    StopMonitor()
    $ui.toast("Stop")
}
// 结束传感器监听，避免计数Bug
function StopMonitor() {
    monitor.setProximityMonitorEnabled(false);
}
module.exports = {
    Start: Start,
    Stop: Stop,
    StopMonitor: StopMonitor
}