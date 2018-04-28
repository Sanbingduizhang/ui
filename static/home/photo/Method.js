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
                    '<img id = "imgdetail" src="'+path+'" alt="图片消失了" title="'+datas[i].img_name+'" imgid="'+datas[i].id+'" img_path="'+ origin_path+'">'+
                '</li>';
    }
    return str;
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
