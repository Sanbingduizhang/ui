function title(data){
    var cate = data.data.cate;
    var cate_len = cate.length; 
    var str = '';
    for(var i = 0;i < cate_len;i++) {
        str += '<li><a href="home/article.html?id='+cate[i].id+'" class="index-head-title">'+cate[i].name+'</a></li>';
    }
    return str;
};
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
//内容右边的标签生成
function re(data){
    var cate = data.data.cate;
    var cate_len = cate.length;
    var str = '';
    var str1 = '';
    var str2 = '';
    var str3 = '';
    for (var i = 0; i < cate_len; i++) {
        str1 =  '<div class="con-right-div">'+
                    '<p><a href="javascript:void(0);">'+cate[i].name+'>>></a></p>'+
                    '<div class="chayu-div">'+
                        '<ul>';
        for(var j = 0;j<cate[i].article.length;j++){
            str2 += '<li><a href="javascript:void(0);">'+cate[i].article[j].title.substring(0,15)+'...</a></li>';
        }
        str3 = '</ul></div></div>';
        str += str1 + str2 + str3;
        str1 = str2 = str3 = '';
        };
    return str;
};