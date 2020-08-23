
//表单验证
var form = layui.form
form.verify({
    len: [/^[\S]{6,12}$/, '密码长度必须6-12位且不能有空格'],
    different: function (val) {
        var oldPwd = $('input[name=oldPwd]').val()
        if (val == oldPwd) {
            return '新密码不能与原密码相同'
        }
    },
    same: function (val) {
        var newPwd = $('input[name=newPwd]').val()
        if (val !== newPwd) {
            return '两次密码不一致'
        }
    }
})

$('form').on('submit', function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    console.log(data)
    $.ajax({
        url: '/my/updatepwd',
        type: 'POST',
        data: data,
        success: function (res) {
            layer.msg(res.message)
        }
    })
})