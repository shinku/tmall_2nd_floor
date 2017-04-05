/**
 * Created by shin on 2017/3/22.
 */
var ui={
    init:function(){
        if(window.parent)
        {
           // console.log($(parent).width());
            var w=$(parent).width();
            //alert(w);
            var sx=w/750;
            $('body').css('-webkit-transform','scale('+sx+','+sx+')');
            $('body').css('-o-transform','scale('+sx+','+sx+')');
            $('body').css('-moz-transform','scale('+sx+','+sx+')');
            $('body').css('-ms-transform','scale('+sx+','+sx+')');
            $('body').css('transform','scale('+sx+','+sx+')');
            $('body').css('transform-origin','0px 0px');
            $('body').css('-o-transform-origin','0px 0px');
            $('body').css('-ms-transform-origin','0px 0px');
            $('body').css('-webkit-transform-origin','0px 0px');
            $('body').css('-moz-transform-origin','0px 0px');
            $('.alert').css('height',$(window).height()/sx+"px");
            $('body').css('height',$(window).height()/sx+"px");
            $('.contenparent').css('height',$(window).height()/sx+"px");
        }
    },
    getIsFollow:function(){
        $.ajax({
            url:'interface.php',
            dataType:'jsonp',
            jsonp:'tmallFanUser',
            type:'get'
        })
    }
}