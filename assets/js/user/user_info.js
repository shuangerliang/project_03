$(function () {
    //校验
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return layer.msg('昵称长度在1-6之间！')
            }
        }

    });

    initUserInfo()
    var layer = layui.layer

    //初始化用户信息
    function initUserInfo(e) {
        e.preventDefault()
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('fromUserInfo', res.data)
            }
        })
    }

    //表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //提交用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改信息失败！')
                }
                layui.msg('恭喜您信息修改成功！')
                window.parent.getUserInfo()
            }
        })
    })
})