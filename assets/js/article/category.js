
//获取类别列表 渲染到页面中



var index
var index1
function renderCategory() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                // 把数据 通过模板引擎 渲染到页面中
                var html = template('tpl-list', res);
                // 把html放到tbody中
                $('tbody').html(html);
            }
        },
        // 设置请求头
        // headers: {
        //     // Authorization: 'token字符串'
        //     Authorization: localStorage.getItem('token')
        // }
    });
};
renderCategory();

//删除
$('body').on('click', 'button:contains("删除")', function () {
    var id = $(this).data('id')
    console.log(id)
    layer.confirm('是否删除？', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                console.log(id)
                console.log(res)
                layer.msg(res.message)
                if (res.status === 0) {
                    renderCategory();
                }
            },
        })
        layer.close(index)
    })
})

// 添加前准备
$('button:contains("添加")').click(function () {
    index = layer.open({
        type: 1,
        title: '添加文章',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    })
})
//添加  点击事件 异步提交表单
$('body').on('submit', '.add-form', function (e) {
    //阻止默认行为
    e.preventDefault()
    //收集数据
    var data = $(this).serialize();
    //异步提交
    $.ajax({
        url: '/my/article/addcates',
        data: data,
        type: 'POST',
        success: function (res) {
            // console.log(res)
            layer.msg(res.message)

            if (res.status === 0) {
                layer.close(index)
                renderCategory()
            }
        }

    })
})


//编辑弹窗
//点击事件
$('body').on('click', 'button:contains("编辑")', function () {
    // 重复上一步
    index1 = layer.open({
        type: 1,
        title: '编辑文章分类',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px']
    });
    //数据回填==>  1  收集数据
    var data = $(this).data()
    // console.log(data)
    //数据回填==>  2  回填
    $('.edit-form input[name="name"]').val(data.name);
    $('.edit-form input[name="alias"]').val(data.alias);
    $('.edit-form input[name="Id"]').val(data.id);
})
//编辑数据
$('body').on('submit', '.edit-form', function (e) {
    //zuzhi
    e.preventDefault()
    //收集表单
    // var data = $(this).serializeArray();
    // data[2].name = 'Id'
    // console.log(data[2])
    var data = $(this).serialize()
    // console.log(data)

    //异步提交
    $.ajax({
        url: '/my/article/updatecate',
        data: data,
        type: 'POST',
        success: function (res) {
            // console.log(res)
            layer.msg(res.message)
            if (res.status === 0) {
                renderCategory();
                layer.close(index1)
            }
        }
    })
})



















// $('body').on('submit', '')

//配置ajax

// function renderCategory() {
//     $.ajax({
//         url: '/my/article/cates',
//         success: function (res) {
//             // console.log(res);
//             // 调用template函数，把模板和数据组合到一起
//             var str = template('tpl-category', res);
//             // var str = template('tpl-category', {
//             //     status: 0,
//             //     message: 'chengg',
//             //     data: [各项数据]
//             // });
//             // 把组合后的HTML标签，放到指定的位置
//             $('tbody').html(str);
//             // $('tbody').html(template('tpl-category', res));
//         }
//     });
// }

// $(function () {

//     var form = layui.form;
//     var addIndex; // 表示添加的弹层
//     var editIndex; // 表示编辑的弹层

//     // ---------------  分类查询，通过模板引擎渲染到页面中 ---------
//     renderCategory();

//     // --------------- 完成删除分类功能 -------------------------
//     // 找到删除按钮，注册单击事件，询问是否要删除，ajax发送请求，完成删除
//     $('body').on('click', '.delete', function () {

//         // 在询问之前，先获取id
//         var id = $(this).attr('data-id');

//         layer.confirm('确定删除吗？你好狠！', { icon: 2, title: '提示' }, function (index) {
//             // do something
//             $.ajax({
//                 url: '/my/article/deletecate/' + id, // 新型的传参方式，只需要把接口中的:id换成实际的数字即可
//                 // url: '/my/article/deletecate/1' // 删除id为1的分类
//                 // url: '/my/article/deletecate/3' // 删除id为3的分类
//                 success: function (res) {
//                     layer.msg(res.message);
//                     if (res.status === 0) {
//                         // 删除成功，重新渲染
//                         renderCategory();
//                     }
//                 }
//             });

//             layer.close(index);
//         });
//     });

//     // --------------- 点击 添加类别 ，弹层 ---------------------
//     $('.layui-card-header button').click(function () {
//         addIndex = layer.open({
//             type: 1,
//             title: '添加类别',
//             content: $('#tpl-add').html(),
//             area: ['500px', '250px']
//         });
//     });

//     // --------------- 点击 确认添加 ，完成添加功能 ---------------
//     // 必须使用事件委托方案注册submit事件
//     // 必须给form表单添加一个id
//     $('body').on('submit', '#add-form', function (e) {
//         e.preventDefault();
//         // alert(123);
//         $.ajax({
//             type: 'POST',
//             url: '/my/article/addcates',
//             data: $(this).serialize(),
//             success: function (res) {
//                 layer.msg(res.message);
//                 if (res.status === 0) {
//                     // 添加成功，重新渲染
//                     renderCategory();
//                     // 关闭弹层
//                     layer.close(addIndex);
//                 }
//             }
//         });
//     });


//     // --------------- 点击 编辑 ，弹层 -------------------------
//     $('body').on('click', '.edit', function () {
//         // 获取三个自定义属性
//         // var id = $(this).attr('laotang-id');
//         // var name = $(this).attr('zhuyunfei');
//         // var alias = $(this).attr('data-alias');
//         // h5中，提供了dataset属性，专门用于获取对象的data-xxx属性值
//         var data = this.dataset; // dataset是dom属性，所以使用dom对象this
//         // console.log(data); // DOMStringMap {id: "1", name: "体育", alias: "fdsdf"}
//         // return;
//         editIndex = layer.open({
//             type: 1,
//             title: '编辑类别',
//             content: $('#tpl-edit').html(),
//             area: ['500px', '250px'],
//             success: function () {
//                 // 弹层之后，执行这个函数。
//                 // 在这个函数中，进行表单赋值
//                 // edit-form是表单的lay-filter属性值
//                 // form.val('edit-form', {
//                 //     id: id,
//                 //     name: name,
//                 //     alias: alias
//                 // });
//                 form.val('edit-form', JSON.parse(JSON.stringify(data)));
//             }
//         });
//     });

//     // --------------- 点击 确认修改 ，ajax提交数据，完成修改 ------
//     $('body').on('submit', '#edit-form', function (e) {
//         e.preventDefault();
//         // var data = $(this).serialize();
//         // data = data.replace('id=', 'Id=');
//         // data = 'I' + data.substr(1);

//         var data = $(this).serializeArray();
//         data[0].name = 'Id';
//         // console.log(data);
//         $.ajax({
//             type: 'POST',
//             url: '/my/article/updatecate',
//             data: data,
//             success: function (res) {
//                 layer.msg(res.message);
//                 if (res.status === 0) {
//                     renderCategory();
//                     layer.close(editIndex);
//                 }
//             }
//         });
//     })


// })

// // var timer = setTimeout(function () {

// }, 1000);

// clearTimeout(timer);