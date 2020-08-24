
var form = layui.form
var laypage = layui.laypage
var data = {
    pagenum: 1,//页码值 获取哪一页的数据
    pagesize: 5,//每页显示几条数据
    // cate_id,
    // state,
}
// 渲染
function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            // console.log(res); // 和分类不一样，自己只能看到自己发布的文章
            // 把结果渲染到页面中
            var html = template('tpl-article', res);
            $('tbody').html(html);
            fn(res.total)
        }
    })
}
renderArticle()


$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        console.log(res)
        if (res.status === 0) {
            var html = template('tpl-category', res)
            // console.log(res)
            console.log(html)
            $('#category').html(html)
            form.render('select')
        }
    }
})


// 分页
function fn(total) {
    laypage.render({
        elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
        , count: total //数据总数，从服务端得到
        , curr: data.pagenum,
        limit: data.pagesize,
        limits: [2, 3, 5, 8, 10],
        layout: ['limit', 'prev', 'page', 'count', 'next', 'skip'],
        jump: function (obj, first) {
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // obj.curr = data.pagenum
            data.pagenum = obj.curr
            console.log(obj.limit); //得到每页显示的条数
            // obj.limit = data.pagesize
            data.pagesize = obj.limit
            console.log(data)
            //首次不执行
            if (!first) {
                renderArticle()
                //do something
            }
        }
    });
}

// template.defaults.impots.formatDate = function (t) {
//     var date = new Date(t)

// }

// 筛选
$('#search').on('submit', function (e) {
    e.preventDefault();
    var cate_id = $('#category').val()
    var state = $('#categroys').val()
    console.log(cate_id, state)
    data.cate_id = cate_id
    data.state = state
    data.pagenum = 1
    console.log(data)
    renderArticle()
})
