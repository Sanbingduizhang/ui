$(function (){
    $.ajax({
            type:"GET",
            url:"http://www.heijiang.top/admin/index",
            dataType:"json",
            success:function(data){
                var yema = data.data.article;
                var ul = $('<ul></ul>');
                var li = title(data);
                $('.header-left').html(ul.html(li));
                var str = su(data);
                $('.con-left').html(str);
                //右边分类
                var catess = cates(data);
                $('.con-right-li-ul').html(catess);
                $('.M-box1').pagination({
                    totalData: yema.total,
                    showData: yema.per_page,
                    current:yema.current_page,
                    coping: true,
                    callback:function(api){
                        $.ajax({
                            type:"GET",
                            url:"http://www.heijiang.top/admin/index?page="+api.getCurrent(),
                            dataType:"json",
                            success:function(data){
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
    //点击文章跳转到详情页
    $('.con-left').on('click','.con-left-con-a',function(){
        var articleid = $(this).attr('articleid');
        window.location.href='http://public.com/ui/home/ardetail.html?articleid='+articleid;
    });
    //点击右边分类加载对应页面
    $('.con-right-li-ul').on('click','.con-right-a',function(){
        var catemid = $(this).attr('catemid');
        ajaxgo(catemid);
    });
    //点击头部分类加载对应页面
    $('.header-left').on('click','.index-head-title',function(){
        var catemid = $(this).attr('catemid');
        ajaxgo(catemid);
    });
});