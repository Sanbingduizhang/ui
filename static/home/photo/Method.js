//获取所有相册
function photos(data){
    var datas = data.data.data;
    var str = '';
    for(var i = 0;i < datas.length;i++){
        var ppath = datas[i].photo;
        var path;
        if(ppath.length != 0){
            path = ppath[0].img_path;
        }else{
            path = 'add.png';
        }
        str += '<div class="con-left-con">'+
                    '<a href="javascript:void(0);" class="con-left-con-a">'+
                        '<img id="imgp" src="'+path+'" alt="这是谁" title="'+datas[i].pname+'" photoid="'+datas[i].id+'">'+
                        '<div class="imgdesc">'+
                            '<span>'+datas[i].created_at+'</span>'+
                            // '<span>'+datas[i].created_at+'</span>'+
                        '</div>'+
                    '</a>'+
                '</div>';
    }
    return str;
}
//单个相册所有图片列表
function pdetail(data){
    var datas = data.data.res.data;
    var str = '';
    for(var i = 0;i < datas.length;i++){
        var path;
        if(datas.length != 0){
            path = datas[i].img_thumb;
            origin_path = datas[i].img_path;
        }else{
            path = 'add.png';
            origin_path = 'add.png';
        }
        str += '<li>'+
                    '<img id = "imgdetail" src="'+path+'" alt="图片消失了" title="'+datas[i].img_name+'" imgid="'+datas[i].id+'" img_path="'+ origin_path+'" cate="'+data.data.cate+'" photoid="'+datas[i].cate_id+'">'+
                '</li>';
    }
    return str;
}

//图片转换方法
function imgTurn(img_path,imgid,cate){
    // var imgDetail_path = quanjuData.data.res.data[imgid-1].img_path;
    //获取图片的宽高
    var imgkg = new Image();
    imgkg.src = img_path;
    //更具图片宽高进行大小转换-----按照宽高800px来显示
    if(imgkg.height < 800 && imgkg.width < 800){
        var imgDetail = '<img src="'+img_path+'" alt="" imgid="'+imgid+'" cate="'+cate+'">';
    } else if(imgkg.height < 800 && imgkg.width > 800) {
        var imgDetail = '<img src="'+img_path+'" alt="" width="100%"  imgid="'+imgid+'" cate="'+cate+'">';
    } else if(imgkg.height > 800 && imgkg.width > 800) {
        var imgDetail = '<img src="'+img_path+'" alt="" width="100%" height="100%"  imgid="'+imgid+'" cate="'+cate+'">';
    } else if(imgkg.height > 800 && imgkg.width < 800) {
        var imgDetail = '<img src="'+img_path+'" alt="" height="100%"  imgid="'+imgid+'" cate="'+cate+'">';
    } else {
        var imgDetail = '<img src="kkkkk.JPG" alt="" height="100%"  imgid="'+imgid+'" cate="'+cate+'">';
    }
    return imgDetail;
}
//单个图片下评论显示
function imgCom(data){
    var str = '';
    var datas = data.data.data;
    //如果没有评论，则显示暂无评论
    if(0 == datas.length){
        return '<div class="noCom">暂无评论</div>';
    }
    //如果有评论，则开始页面渲染
    for(var i = 0;i < datas.length;i++) {
        str += '<div class="showcom" comment_id="'+datas[i].id+'" cate="'+datas[i].cate+'">'+
                    '<p><a href="javascript:void(0);">'+datas[i].user_info.name+'</a>回复:</p>'+
                    '<p>'+datas[i].content+'</p>'+
                    '<p>'+
                    '<a href="javascript:void(0);" class="reply">回复(<span>'+datas[i].reply_count+'</span>)</a>'+
                    '<a href="javascript:void(0);" class="likeGo">点赞(<span>'+datas[i].likecount+'</span>)</a>'+
                    // '<a href="javascript:void(0);" class="delCom">删除</a>'+  //      展示给用的页面暂不启用删除，留待后期增加用户登陆再进行更新
                    '</p>'+
                '</div>';
    }
    str += '<div class="showMore">更多评论>>></div>';    
    return str; 
}
//单个图片下评论显示所有
function imgComMore(data){
    var str = '';
    var datas = data.data;
    //如果有评论，则开始页面渲染
    for(var i = 0;i < datas.length;i++) {
        str += '<div class="showcom" comment_id="'+datas[i].id+'" cate="'+datas[i].cate+'">'+
                    '<p><a href="javascript:void(0);">'+datas[i].user_info.name+'</a>回复:</p>'+
                    '<p>'+datas[i].content+'</p>'+
                    '<p>'+
                        '<a href="javascript:void(0);" class="reply">回复(<span>'+datas[i].reply_count+'</span>)</a>'+
                        '<a href="javascript:void(0);" class="likeGo">点赞(<span>'+datas[i].likecount+'</span>)</a>'+
                        '<a href="javascript:void(0);" class="delCom">删除</a>'+
                    '</p>'+
                '</div>';
    }
    
    return str; 
}


//图片完整显示方法
function imgYuan(quanjuData,imgid){
    var imgDetail_path = quanjuData.data.res.data[imgid-1].img_path;
    //获取图片的宽高
    var imgkg = new Image();
    imgkg.src = imgDetail_path;
    var imgDetail = '<img src="'+imgDetail_path+'" alt="">';
    return imgDetail;
}

//加载图片列表中head头部信息
function headM(data){
    var Mes = data.data;
    var str = '';
    // if(Mes.userimg.length != 0){
    //     img_path = Mes.userimg;
    // } else {
    //     img_path = 'kkkkk.JPG';
    // }
    str += '<div class="myPhoto">'+
                '--->>>'+Mes.photoname+
            '</div>'+
            '<div class="mess">'+
                '<span>作者:'+Mes.username+'</span>'+
                '<span>共'+Mes.res.total+'张</span>'+
                '<span>创建于:'+Mes.phototime+'</span>'+
            '</div>'+
            '<div class="usermess">'+
                '<span class="username">用户1</span>'+
                '<span class="userhead">头像</span>'+
            '</div>';
    return str;
}
