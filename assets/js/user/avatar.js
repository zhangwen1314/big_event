// ---------------  创建剪裁区 ------------------
// - 找到剪裁区的图片 （img#image）
var $image = $('#image');
// - 设置配置项
var options = {
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
};
// - 调用cropper方法，创建剪裁区
$image.cropper(options);


//点击上传 选择头像
$('button:contains("上传")').click(function () {
    $('#file').click();
});



$('#file').change(function () {
    console.dir(this)
    var fileObj = this.files[0]
    // console.log(fileObj)
    var url = URL.createObjectURL(fileObj)
    // console.log(url)
    $image.cropper('destroy').attr('src', url).cropper(options);
})


$('button:contains("确定")').click(function () {
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    })
    var img_base64 = canvas.toDataURL();
    $.ajax({
        url: '/my/update/avatar',
        type: 'POST',
        data: { avatar: img_base64 },
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                window.parent.getUserInfo()
            }
        }
    })
})