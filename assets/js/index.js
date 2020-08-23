

//渲染头像和欢迎语
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res, res.data.nickname, res.data.username)

            if (res.status === 0) {
                var name = res.data.nickname || res.data.username
                var s = name.substr(0, 1).toUpperCase()
                console.log(s)
                $('.username').html(name)
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show()
                } else {
                    $('.text-avatar').html(s).css('display', 'inline-block')
                }
            }
            else if (res.status === 1 && res.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        },
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // }
    })
}
getUserInfo()

//退出
$('#logout').click(function () {
    console.log(1)
    layer.confirm('确定要退出么?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html'
        // location.href()
        layer.close(index)
    })
})