$(function(){
    console.log(tokenGet());
    var articleid = Number(window.location.href.split('?')[1].split('=')[1]);
    var arrtoken = tokenGet().split('+');
    if(tokenGet()) {
        var token = '?token='+arrtoken[0]+'%2B'+arrtoken[1];
    } else {
        var token = '';
    }
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/home/article/uindex/"+articleid+token,
        dataType:"json",
        success:function(data){
            var detailtitle = detitle(data);
            var detext = data.data.content;
            var catename = data.data.cates.name + '>';
            var likeC = data.data.like_count_count;
            //文章标题
            $('.texttitle').html(detailtitle);
            //文章内容
            $('.copytext').html(detext);
            //导航上面的文章分类
            $('.titlecate').html(catename);
            //导航上面的文章标题
            $('.titletitle').html(data.data.title);
            //如果用户登陆，则判定是否点赞，如果未点赞，则likeId置为0,
            likeC ? $(".like").attr('likeId',likeC) : '';
        },
        error:function (jqXHR){
            console.log(jqXHR);
        }
    });

    //点赞，取消赞
    $(".like").click(function(){
        if(!tokenGet()){
            alert('请登陆');
            return false;
        }
        var id = (typeof($(".like").attr('likeId')) == 'undefined') ? 0 : $(".like").attr('likeId');
        var cate = $(".hh").attr('cate');
        var article_id = $(".hh").attr('article_id');
        // console.log(id,cate,article_id);return;
        $.ajax({
            type:"POST",
            url:"http://www.heijiang.top/home/like/LikeGo",
            dataType:"json",
            data:{
                token:tokenGet(),
                id:id,
                arPh_id:article_id,
                cate:cate,
            },
            success:function(data){
                alert('操作成功');
                location.reload();
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }
        });
        console.log(id);
        console.log(cate);
        console.log(article_id);
    });
});