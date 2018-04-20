function title(data){
    var cate = data.data.cate;
    var cate_len = cate.length; 
    var str = '';
    for(var i = 0;i < 6;i++) {
        str += '<li><a href="javascript:void(0);" class="index-head-title" catemid = "'+cate[i].id+'">'+cate[i].name+'</a></li>';
    }
    return str;
};
//分类
function cates(data){
    var cates = data.data.cate;
    var cates_len = cates.length;
    str = '';
    for(var i = 0;i < cates_len;i++){
        str += '<li class="con-right-li-li  con-right-cate"><a href="javascript:void(0);" class="con-right-a" catemid = "'+cates[i].id+'">'+cates[i].name+'</a></li>';
    }
    return str;
}
//内容左边的标签生成方法
function su(data){
    var article = data.data.article.data;
    var len = article.length;
    // 标签生成
    var str = '';
    for (var i = 0; i < len; i++) {
    str +=  '<div class="con-left-con">'+
                '<a href="javascript:void(0);" class="con-left-con-a" articleid="'+article[i].id+'">'+
                    '<div class="con-left-top">'+
                        '<span class="con-left-top-title">'+article[i].title.substring(0,20)+'...</span>'+
                        '<span class="con-left-top-author">'+article[i].userinfo.name+'&nbsp;&nbsp;&nbsp;&nbsp;'+article[i].updated_at+'</span>'+
                    '</div>'+
                    '<div class="con-left-mid">'+
                        '<p class="con-left-mid-desc">'+article[i].desc.substring(0,200)+'...</p>'+
                    '</div>'+
                    '<div class="con-left-bot">'+
                        '<span class="con-left-bot-cate">分类:'+article[i].cates.name+'</span>'+
                        '<span class="con-left-bot-like">点赞('+article[i].like+')&nbsp;&nbsp;评论('+article[i].comment_count+')</span>'+
                    '</div>'+
                '</a>'+
            '</div>';
        };
        return str;
};

//ajax请求公用部分
function ajaxgo(catemid){
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/admin/index/"+catemid,
        dataType:"json",
        success:function(data){
            //页码
            var yema = data.data.article;
            //左边对应分类文章显示
            var str = su(data);
            $('.con-left').html(str);
            //分类标题
            $('.cate').text(data.data.cate_name);
            $('.M-box1').pagination({
                //页码总条数
                totalData: yema.total,
                //页码每一页显示条数
                showData: yema.per_page,
                //页码当前页
                current:yema.current_page,
                coping: true,
                callback:function(api){
                    $.ajax({
                        type:"GET",
                        url:"http://www.heijiang.top/admin/index/"+catemid+"?page="+api.getCurrent(),
                        dataType:"json",
                        success:function(data){
                            //左边对应分类的文章
                            var str = su(data);
                            $('.con-left').html(str);
                            },
                        error:function (jqXHR){
                            console.log(jqXHR);
                        }
        
                    });
                },
            }); 
        },
        error:function (jqXHR){
            console.log(jqXHR);
        }
    });
}