$(function(){
    var articleid = Number(window.location.href.split('?')[1].split('=')[1]);
    console.log(articleid);
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/home/article/uindex/"+articleid,
        dataType:"json",
        success:function(data){
            var detailtitle = detitle(data);
            var detext = data.data.content;
            var catename = data.data.cates.name + '>';
            //文章标题
            $('.texttitle').html(detailtitle);
            //文章内容
            $('.copytext').html(detext);
            //导航上面的文章分类
            $('.titlecate').html(catename);
            //导航上面的文章标题
            $('.titletitle').html(data.data.title);
        },
        error:function (jqXHR){
            console.log(jqXHR);
        }
    });
});