var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    //如果需要权限 权限有/my/ 再给他headers 
    if (params.url.indexOf('/my/') !== -1) {
        params.headers ={
            Authorization:localStorage.getItem('token')
        }
    }
    

    //不管是否成功 都有complete函数 判断身份信息 responseJSON获取信息
    params.complete = function (res) {
        if (res.responseJSON.message === "身份认证失败！") {
            //清除token
            localStorage.removeItem('token')
            location.href='/login.html'
        }
        
    }
})
