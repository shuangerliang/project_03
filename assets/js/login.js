$(function () {
    //1.点击去注册 登录表单隐藏 注册表单显示
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //校验
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //确认密码校验
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })

    //注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            succeess: function (res) {
                if (res.stauts !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功 请登录')
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }

        })
    })

    //登录表单 
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),//快速获取表单数据
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                //提示信息 保存token 未来接口要使用 跳转页面
                layer.msg('恭喜您登录成功')
                //权限校验 用户是否登录
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})