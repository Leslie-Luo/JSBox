// view 视图、parent 父级、view_direction view方向、parent_direction 父级方向、distance 距离
function animate(view, parent, show = true, view_direction, parent_direction, distance) {
    let alpha = show ? 1 : 0
    let damping = show ? 0.6 : 1
    $(view).updateLayout(function (make) {
        make[view_direction].equalTo($(parent)[parent_direction]).offset(distance)
    })
    $ui.animate({
        duration: 1, //动画时间
        damping: damping, //阻尼大小
        animation: function () {
            $(view).relayout()
            setTimeout(() => {
                $(view).alpha = alpha
            }, 0);
        }
    })
}

module.exports = {
    animate: animate
}