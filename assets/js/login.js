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
    $('.register').show()
    $('.login').hide()
})
$('.register a').click(function (e) {
    e.preventDefault();
    $('.login').show()
    $('.register').hide()
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