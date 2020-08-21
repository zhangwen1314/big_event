//统一配置ajax
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url

    // option.headers = { Authorization: localStorage.getItem('token') }
    // option.headers =
    if (option.url.includes('/my/')) {
        option.headers = { Authorization: localStorage.getItem('token') }
    }
    option.complete = function (xhr) {
        if (xhr.responseJSON && xhr.responseJSON.status === 1) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }


})