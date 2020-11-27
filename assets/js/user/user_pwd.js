$(function () {
    //校验 提交
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value == $('name=oldPwd').val()) {
                return '新密码不能与旧密码相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('name=newPwd').val()) {
                return '两次输入密码不一致！'
            }
        }
    });

    //修改密码form submit
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            //data快速获取
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.msg(res.data)
                }
                layui.msg('修改密码成功！')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})