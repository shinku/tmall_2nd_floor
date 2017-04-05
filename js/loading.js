var app={
    isLoaded:false,
    textureloadedindex:0,
    sourceloadedindex:0,
    imgArr:[],
    init:function(){
        this.loading();
    },
    loading:function(){
        var self = this;
    },
    handleLoadedTexture:function(){
        app.textureloadedindex++;
        var loaded=app.sourceloadedindex;
        //console.log(loaded);
        hasLoadPercent = Math.round( (loaded+app.textureloadedindex) / (app.imgArr.length +TextureManager.loadnumber )* 100 );
        anPercent(hasLoadPercent);
    },
    launchApp:function(){
        if(Tida.hideLoading)
        {
            Tida.hideLoading();
        }
        $('.alert').show();
        $('#content').css('transform','scale3d(0,0,1)');
        //场景初始化
        app.isLoaded=true;
        orientationObj.init();
    }
}
//window.onload = app.init();
//图片加载
var hasLoadPercent = 0;
//百分数动画
var CompletionPercent = 0;
function anPercent(fn){
    if(fn>=100 && app.isLoaded==false ){
        //console.log(12313);
       app.launchApp();
    }
   /* var timer = setInterval(function() {
        if (CompletionPercent >= hasLoadPercent) {
            if(CompletionPercent>=100){
               // return;
                clearInterval(timer);
                fn();
                $(".loading").remove();
                setTimeout(function(){
                    //$(".alert").remove();
                }, 3000);
                document.getElementById("music").play();
            }
            return;
        } else {
            CompletionPercent = CompletionPercent + 1;
            //$('.loadingfrontbar').css('width',CompletionPercent+'%');
            //document.getElementById("msg").innerHTML = "店铺故事正在加载..";
        }
    },20);*/
}