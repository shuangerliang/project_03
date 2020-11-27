$(function () {
    //退出事件
    $('#btnLogOut').on('click', function (e) {
        e.preventDefault()
        layer.open({
            content: '确定退出',
            yes: function (index, layero) {
                //do something
                //1.清除token
                localStorage.removeItem('token');
                //2.跳转页面
                location.href = '/login.html'
                layer.close(index); //如果设定了yes回调，需进行手工关闭
            }
        });

    })
})

var layer = layui.layer
//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 放进api.js
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderAvatar();
        }
    })
}
//渲染用户信息
function renderAvatar(user) {
    //1.用户名
    var name = user.username || user.nickname;
    //2.welcome文本设置
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    //3.头像 有头像显示 无头像将首字母大写出来
    if (user.user_pic !== null) {
        //有头像 .attr src
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
        //无头像 .html
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}