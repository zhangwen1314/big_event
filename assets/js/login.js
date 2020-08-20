// 登录//
$('.login form').on('submit', function (e) {
    console.log(1)
    e.preventDefault();
    var data = $(this).serialize()
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        type: 'POST',
        data: data,
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {

                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        }
    })
})

// 切换盒子//
$('.login a').click(function (e) {
    e.preventDefault();
    $('.register').show().prev().hide()
    // $('.login').hide()
})
$('.register a').click(function (e) {
    e.preventDefault();
    $('.login').show().next().hide()
    // $('.register').hide()
})

//注册//
$('.register form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize()
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        type: 'POST',
        data: data,
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                $('.login').show().next().hide()
                $('.register form')[0].reset();
            }
        }
    })
})
// 验证
// 加载模块
var form = layui.form
// 使用方法  里面装对象
form.verify({
    //使用数组
    changdu: [/^[\S]{6,12}$/, '长度6-12位,不允许有空格'],
    same: function (val) {
        var pwd = $('.pwd').val()
        if (pwd !== val) return '两次密码不一致'
    }
});