const util = require('./util');

let device = $device.info
console.log(device.screen.width)
function sayHello() {
  $ui.render({
    props: {
      bgcolor: $rgba(235, 235, 235, 1),
      navBarHidden: true,
      statusBarStyle: 0
    },
    views: [
      {
        type: "label",
        props: {
          text: "0",
          align: $align.center,
          id: "number",
          font: $font("bold", 150),
          bgcolor: $rgba(255, 255, 255, 1),
          smoothRadius: 15
        },
        layout: function(make, view) {
          make.centerX.equalTo()
          make.top.equalTo(40)
          make.size.equalTo($size(device.screen.width - 30, 200))
        }
      },
      {
        type: "label",
        props: {
          text: "",
          align: $align.center,
          id: "time",
          font: $font("bold", 30),
          hidden: true
        },
        layout: function(make, view) {
          make.top.equalTo($("number").bottom).offset(45)
          make.centerX.equalTo(0)
        }
      },
      {
        type: "button",
        props: {
          title: "开始",
          id: "start",
          circular: true,
        },
        layout: function(make, view) {
          make.size.equalTo($size(100, 100))
          make.bottom.equalTo().inset(100)
          make.centerX.equalTo()
          make.width.equalTo(100)
        },
        events: {
          tapped: function(sender) {
            util.Start()
          }
        }
      },
      {
        type: "button",
        props: {
          title: "结束",
          id: "stop",
          hidden: true
        },
        layout: function(make, view) {
          make.top.equalTo($("start").bottom).offset(20)
          make.centerX.equalTo()
          make.width.equalTo(64)
        },
        events: {
          tapped: function(sender) {
            util.Stop()
          }
        }
      }
    ],events: {
      appeared: function() {
        util.StopMonitor()
      },
      disappeared: function() {
        util.StopMonitor()
      },
      dealloc: function() {
        util.StopMonitor()
      }
    }
  })
}

module.exports = {
  sayHello: sayHello
}

$app.listen({
  // 在应用启动之后调用
  ready: function() {
    util.StopMonitor()
  },
  // 在应用退出之前调用
  exit: function() {
    util.StopMonitor()
  }
});