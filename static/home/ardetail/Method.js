function detitle(data){
    var detail = data.data;
    str = '<h1 class="hh">'+detail.title+'</h1>'+
            '<p class="textinfo">'+
                '<span>作者:<a href="">'+detail.user_info.name+'</a></span>'+
                '<span>字数:'+detail.wordsnum+'</span>'+
                '<span>点赞:'+detail.like+'</span>'+
                '<span>评论:'+detail.comment_count+'</span>'+
                '<span>更新时间:'+detail.updated_at+'</span>'+
            '</p>';
    return str;
    
};