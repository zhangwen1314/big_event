
var form = layui.form
var laypage = layui.laypage
var data = {
    pagenum: 1,//页码值 获取哪一页的数据
    pagesize: 5//每页显示几条数据
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
function fn() {
    laypage.render({
        elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
        , count: 50 //数据总数，从服务端得到
        , curr: 1,
        layout: ['limit', 'prev', 'page', 'count', 'next', 'skip']
    });
}
fn()

// template.defaults.impots.formatDate = function (t) {
//     var date = new Date(t)

// }