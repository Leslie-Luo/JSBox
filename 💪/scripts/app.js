const util = require('./util');

function sayHello() {
  $ui.render({
    views: [
      {
        type: "label",
        props: {
          text: "0",
          align: $align.center,
          id: "number",
          font: $font("bold", 150)
        },
        layout: function(make, view) {
          make.centerX.equalTo()
        }
      },
      {
        type: "button",
        props: {
          title: "Start",
          id: "start"
        },
        layout: function(make, view) {
          make.top.equalTo($("number").bottom).offset(30)
          make.centerX.equalTo(-40)
          make.width.equalTo(64)
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
          title: "Stop"
        },
        layout: function(make, view) {
          make.top.equalTo($("number").bottom).offset(30)
          make.centerX.equalTo(40)
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