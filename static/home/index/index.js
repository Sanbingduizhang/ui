$(function (){
    $.ajax({
            type:"GET",
            url:"http://www.heijiang.top/home/index",
            dataType:"json",
            success:function(data){
                var yema = data.data.article;
                var ul = $('<ul></ul>');
                var li = title(data);
                $('.header-left').html(ul.html(li));
                var str = su(data);
                var ree = re(data);
                $('.con-left').html(str);
                $('.con-right').html(ree);
                $('.M-box1').pagination({
                    totalData: yema.total,
                    showData: yema.per_page,
                    current:yema.current_page,
                    coping: true,
                    callback:function(api){
                        $.ajax({
                            type:"GET",
                            url:"http://www.heijiang.top/home/index?page="+api.getCurrent(),
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
    //登录功能
    $('#linkSub').click(function() {
        $('#login').show();
        $('#bg').show();
    });
    $('#closeBtn').click(function() {
        $('#login').hide();
        $('#bg').hide();
    });
    //小火箭向上滑动
});