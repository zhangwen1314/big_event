// 初始化编辑器
initEditor()

$('#add').on('submit', function (e) {
    e.preventDefault()
    var fd = new FormData(this)
    // console.log(data)
    fd.forEach((val, key) => {
        console.log(val, key)
    })
    $.ajax({
        type: 'POST',
        url: '/my/article/add',
        data: fd,
        success: function (res) {
            console.log(res)
            alert(res.message)
            if (res.status === 0) {
                '添加成功'
            }
        },
        processData: false,//不处理数据
        contentType: false//不带请求头
    })
})




// 获取分类 渲染到下拉框

$.ajax({
    url,
    success: function (res) {
        var html = template('tpl-category', res)
        $('#categroy').html(html)
        form.render('select')
    }
})

// ---------------  创建剪裁区 ------------------
// - 找到剪裁区的图片 （img#image）
// 显示默认的剪裁效果
var $image = $('#image');
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
};
$image.cropper(options);


// 点击 选择封面 可以选择图片
$('.image-btn').click(function () {
    $('#file').click();
});

// 文件域的内容改变的时候，重置剪裁区
$('#file').change(function () {
    // 找到文件对象，为其创建url
    var url = URL.createObjectURL(this.files[0]);
    // 销毁剪裁区，更换图片，重建剪裁区
    $image.cropper('destroy').attr('src', url).cropper(options);
});


$('#file').change(function () {
    console.dir(this)
    var fileObj = this.files[0]
    // console.log(fileObj)
    var url = URL.createObjectURL(fileObj)
    // console.log(url)
    $image.cropper('destroy').attr('src', url).cropper(options);
})
