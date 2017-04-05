/**
 * Created by shin on 2017/3/1.
 */
Tida.ready({},function(){
    //alert('tida is ready')
    //console.log('tida is ready');
    /*Tida.doAuth(false,function(data){
        //alert(JSON.stringify(data));
        //alert(window.location.href);
        //tmAUTH();
        //playTmallVideo('http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/51756850.mp4');
    });*/
    Tida.mixNick({}, function (data) {
       // alert("mixname = "+JSON.stringify(data));
        ui.getIsFollow();
    });
});
//http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/51756850.mp4 //blods
//http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/51756702.mp4 //cwt
var UC = navigator.userAgent.match(/UCBrowser/);
var wrapWidth = window.screen.width;
var wrapHeight = wrapWidth *756/540;
var wvWidth;
var wvHeight;
if(UC){
    wvWidth = wrapWidth.toString();
    wvHeight = wrapHeight.toString();
}else {
    wvWidth = (wrapWidth * window.devicePixelRatio).toString();
    wvHeight = (wrapHeight * window.devicePixelRatio).toString();
}
function playTmallVideo(videosrc){
    $('.mblicons').show();
    Tida.openInteractVideo({
        'videoUrl': videosrc, //视频url可以通过TOP接口//open.taobao.com/doc2/apiList.htm?scopeId=12283获取
        'width' : wvWidth, // 整数，视频的宽度，现在只能是屏幕的宽度
        'height': wvHeight, // 整数，视频高度
        'from': "SHOP", //视频来源，用来确定互动方案的来源
        'userId' : "3129324064", //视频编辑者的userId,需要用淘宝授权方式获取到
        'interactiveVideoId' : "", //互动视频id，店铺2楼的可写空
        'showCloseBtn' : "false", //是否显示关闭按钮
        'processKeyBackEvent' : true //（仅Android端支持）在点击返回键时，是否需要关闭视频；取值为“true”、“false”
    }, function (e){
        //alert(JSON.stringify(e));
    });
}
function closeTmallVideo()
{
    Tida.closeInteractVideo({},function(){})
    $('.mblicons').hide();
}
function followStore(callback)
{
    Tida.follow({
        pubAccountId:'743750137' // 商家的userid
    }, function(data){
        callback(data);
    });
}
var tmallUser={
    isFan:false
};

function tmallFanUser(data)
{
    if(data.data.result=="1")
    {
        //是粉丝
        tmallUser.isFan=true;
    }
    else{
        //不是粉丝
        tmallUser.isFan=false;
    }
}