//内容左边的标签生成方法
function su(data){
    var article = data.data.data;
    var cate_name = data.data.cate_name;
    var len = article.length;
    // 标签生成
    var str = '';
    for (var i = 0; i < len; i++) {
    str +=  '<div class="con-left-con">'+
                '<a href="javascript:void(0);" class="con-left-con-a" articleid="'+article[i].id+'">'+
                    '<div class="con-left-top">'+
                        '<span class="con-left-top-title">'+article[i].title.substring(0,20)+'...</span>'+
                        '<span class="con-left-top-author">'+article[i].user_info.name+'&nbsp;&nbsp;&nbsp;&nbsp;'+article[i].updated_at+'</span>'+
                    '</div>'+
                    '<div class="con-left-mid">'+
                        '<p class="con-left-mid-desc">'+article[i].desc.substring(0,200)+'...</p>'+
                    '</div>'+
                    '<div class="con-left-bot">'+
                        '<span class="con-left-bot-cate">分类:'+cate_name+'</span>'+
                        '<span class="con-left-bot-like">点赞('+article[i].like+')&nbsp;&nbsp;评论('+article[i].comment_count+')</span>'+
                    '</div>'+
                '</a>'+
            '</div>';
        };
        return str;
};
//推荐
function rec(data){
    var rec = data.data.articleRec;
    var rec_len = rec.length;
    str = '';
    for(var i = 0;i < rec_len;i++){
        str += '<li class="con-right-recon-li"><a href="javascript:void(0);" class="con-right-recon-a" temid = "'+rec[i].id+'">'+rec[i].title.substring(0,12)+'...</a></li>';
    }
    return str;
}
//热门
function re(data){
    var re = data.data.articleRe;
    var re_len = re.length;
    str = '';
    for(var i = 0;i < re_len;i++){
        str += '<li class="con-right-recon-li"><a href="javascript:void(0);" class="con-right-recon-a" mid = "'+re[i].id+'">'+re[i].title.substring(0,12)+'...</a></li>';
    }
    return str;
}
//分类
function cates(data){
    var cates = data.data.cates;
    var cates_len = cates.length;
    str = '';
    for(var i = 0;i < cates_len;i++){
        str += '<li class="con-right-li-li  con-right-cate"><a href="javascript:void(0);" class="con-right-a" catemid = "'+cates[i].id+'">'+cates[i].name+'</a></li>';
    }
    return str;
}

function load(){
    
}