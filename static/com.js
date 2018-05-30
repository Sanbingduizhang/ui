function Immediate(){
    $.DialogByZ.Close();
 }
 //jqsession功能
 (function($){$.session={_id:null,_cookieCache:undefined,_init:function()
    {if(!window.name){window.name=Math.random();}
    this._id=window.name;this._initCache();var matches=(new RegExp(this._generatePrefix()+"=([^;]+);")).exec(document.cookie);if(matches&&document.location.protocol!==matches[1]){this._clearSession();for(var key in this._cookieCache){try{window.sessionStorage.setItem(key,this._cookieCache[key]);}catch(e){};}}
    document.cookie=this._generatePrefix()+"="+document.location.protocol+';path=/;expires='+(new Date((new Date).getTime()+120000)).toUTCString();},_generatePrefix:function()
    {return '__session:'+this._id+':';},_initCache:function()
    {var cookies=document.cookie.split(';');this._cookieCache={};for(var i in cookies){var kv=cookies[i].split('=');if((new RegExp(this._generatePrefix()+'.+')).test(kv[0])&&kv[1]){this._cookieCache[kv[0].split(':',3)[2]]=kv[1];}}},_setFallback:function(key,value,onceOnly)
    {var cookie=this._generatePrefix()+key+"="+value+"; path=/";if(onceOnly){cookie+="; expires="+(new Date(Date.now()+120000)).toUTCString();}
    document.cookie=cookie;this._cookieCache[key]=value;return this;},_getFallback:function(key)
    {if(!this._cookieCache){this._initCache();}
    return this._cookieCache[key];},_clearFallback:function()
    {for(var i in this._cookieCache){document.cookie=this._generatePrefix()+i+'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';}
    this._cookieCache={};},_deleteFallback:function(key)
    {document.cookie=this._generatePrefix()+key+'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';delete this._cookieCache[key];},get:function(key)
    {return window.sessionStorage.getItem(key)||this._getFallback(key);},set:function(key,value,onceOnly)
    {try{window.sessionStorage.setItem(key,value);}catch(e){}
    this._setFallback(key,value,onceOnly||false);return this;},'delete':function(key){return this.remove(key);},remove:function(key)
    {try{window.sessionStorage.removeItem(key);}catch(e){};this._deleteFallback(key);return this;},_clearSession:function()
    {try{window.sessionStorage.clear();}catch(e){for(var i in window.sessionStorage){window.sessionStorage.removeItem(i);}}},clear:function()
    {this._clearSession();this._clearFallback();return this;}};$.session._init();})(jQuery);
//获取token
function tokenGet(){
    // var token = $.session.get('token');
    // var token = localStorage.getItem('token');
    var token = $.cookie('token');
    if(token){
        return token;
    } else {
        return '';
    }
}
// window.onunload = function (){  
//     _gap_time = new Date().getTime() - _beforeUnload_time;  
//     if(_gap_time <= 5){  
//         localStorage.clear(); 
//     }else{//浏览器刷新  
//     }  
// } 
//设置token
function tokenSet(data){
    if('' != data.data.token){
        // localStorage.setItem('token', data.data.token);
        $.cookie('token',data.data.token);
        // $.session.set('token', data.data.token);
    }   
}

$(function(){
    
    $("#login-button-submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        if(username.length < 3 || username.length > 16){
            alert("用户名需大于三位且小于16位");
            return false;
        }
        if(password.length < 3 || password.length > 16){
            alert("密码需大于三位且小于16位");
            return false;
        }
        $.ajax({
            type:"POST",
            url:"http://www.heijiang.top/home/login",
            dataType:"json",
            data:{
                username:username,
                password:password,
            },
            success:function(data){
                tokenSet(data);
                // var token = $.session.get('token');
                // console.log(token);
                $(".li1").html("还有谁");
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }

        });
    });
});