
var form = layui.form

//1 数据回填
function renderForm() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res)
            // $('input[name=username]').val(res.data.username)
            // $('input[name=nickname]').val(res.data.nickname)
            // $('input[name=email]').val(res.data.email)
            // $('input[name=id]').val(res.data.id)
            form.val("formTest", res.data)
        }
    })
}
renderForm()


$('form').on('submit', function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    // console.log(data)
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            // console.log(res)
            layer.msg(res.message)
            if (res.status === 0) {
                window.parent.getUserInfo()
            }
        }
    })
})

//重置
$('.layui-btn-primary').click(function (e) {
    e.preventDefault();
    // console.log(1)
    renderForm()
})