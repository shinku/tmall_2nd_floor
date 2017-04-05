var sence = null;
//camera 类
var camera = null;
var dfAlpha = dfBeta = null, trigger = 0.1, //trigger为灵敏度
    minRtx = -17, maxRtx = 12;
var controller = {
    clickvideoid:0,
    getOpenId:0,
    IsSubscribe:0,
    eventDetailsState:false,
    navState:false,
    cameraToRotateX:0,
    cameraToRotateY:0,
    cameraToZ:0,
    phone: "",
    device: "",
    config:function(){
        //return;
        //app.init();
        $('.alertbtn').bind('click',function(){
            controller.eventDetailsState=false;
            $(".alert").remove();
            TRACKING.gaevent('Button_enter');
        })

        $('.pro_closebtn').bind('touchstart',function(){
            controller.eventDetailsState=false;
            $('.proShow').hide();
        },false)
        //开始加载
        $('.mblicons .makeithappen').bind('click',function(){
            closeTmallVideo();
        });
        $('.mblicons .closebtn').bind('click',function(){
            closeTmallVideo();
        });
    }
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|ipad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    notiOS: function() {
        return (isMobile.Android() || isMobile.BlackBerry()|| isMobile.Windows());
    },
    noPc:function(){
        return (isMobile.Android() || isMobile.BlackBerry()|| isMobile.Windows() || isMobile.iOS());
    }
};
if(isMobile.notiOS()){ //非iOS系统
    controller.device = "Android";
}
else if(isMobile.iOS()){ //iOS系统
    controller.device = "apple";
}
//1函数参数依次为贴图的url、2切片数、3Sprite3D对象y坐标、4空间半径、5变化角度、6最大切片数、7当前贴图所属类型（0为非icon、其他正整数为icon）
function BigSence(url, sg, y, h, R, trans, n, m, t,callback) {
    controller.totlaSizeIn=2;
    this.sps=[];
    this.headSp;
    this.footSp;
    y=y/controller.totlaSizeIn;
    h=h/controller.totlaSizeIn;
    R=R/controller.totlaSizeIn;
    this.onCreated=callback;
    var TM = new TextureManager();
    //加载贴图
    //console.log(url+"img");
    var self=this;
    this.onclick=function(){};
    this.init=function(){
        for (var i = 0; i < sg; i++) {
            if(i > n) {
                break;
            }
            else{
                var sp = new Sprite3D(100, h);
                if(m === true){
                    sp.width = 2 * Math.sin((360 / sg / 2 +0)/ 180 * Math.PI) * R + 13;
                }
                else if(m === "0"){
                    sp.width = 2 * Math.sin(360 / sg / 2 / 180 * Math.PI) * R + 2.2;
                }
                else if(m===false){
                    sp.width = 2 * Math.sin(360 / sg / 2 / 180 * Math.PI) * R + 1.6;
                }
                sp.y = y;
                sp.center_dis = R;
                sp.center_angle = (i / sg) * 360 + trans;
                sp.textureByBase64 = TM.getTexture({ xp: i / n, yp: 0, wp: 1 / n, hp: 1 });
                sp.x = Math.sin((sp.center_angle) / 180 * Math.PI) * sp.center_dis + 500;
                sp.z = -Math.cos((sp.center_angle) / 180 * Math.PI) * sp.center_dis;
                sp.rotatey = -sp.center_angle;
                //sp.visible(false);
                sence.add3DObject(sp);
                self.sps.push(sp);
                sp.addEventListener('click',function(){
                    if(self.onclick){
                        self.onclick();
                        //console.log("我被点击了");
                    }
                });

            }
        };
        TM.dispose();
        if(self.onCreated)
        {
            self.onCreated()
        }

    };
    this.show=function(){
        for(var i=0;i<self.sps.length;i++)
        {
            self.sps[i].visible(true);
        }
    };
    this.hide=function(){
        for(var i=0;i<self.sps.length;i++)
        {
            self.sps[i].visible(false);
        }
    }
    this.handleTextureLoaded=function(){
        self.init();
    };
    TM.addEventListener('textureloaded', function (e) {
        app.handleLoadedTexture();
        self.handleTextureLoaded();
    });
    //TM.loadTextrure(wt[url]);
    TM.drawImage(document.getElementById(url+"img"));
};
function flyingIcon(sg, y, h, R, trans)
{
    //return;
    y=y/controller.totlaSizeIn;
    h=h/controller.totlaSizeIn;
    R=R/controller.totlaSizeIn;
    var self=this;
    this.addM=function(){

        var sp=new Sprite3D(h,h);
        sp.width = 2 * Math.sin((360 / sg / 2 +0)/ 180 * Math.PI) * R;
        sp.y = y;
        sp.height=h;
        sp.width=h;
        sp.center_dis = R;
        sp.center_angle = (0 / sg) * 360 + trans;
        sp.x = Math.sin((sp.center_angle) / 180 * Math.PI) * sp.center_dis + 500;
        sp.z = -Math.cos((sp.center_angle) / 180 * Math.PI) * sp.center_dis;
        sp.rotatey = -sp.center_angle;
        sp.textureByUrl='//mblcce.image.alimmdn.com/icons-btn.png.webp?t=1488461740010';
        sp.div_icon.style['background-size']='100% 100%';
        sp.div_icon.style['backface-visibility']=sp.div_icon.style['-webkit-backface-visibility']=sp.div_icon.style['-o-backface-visibility']
        =sp.div_icon.style['-moz-backface-visibility']=sp.div_icon.style['-ms-backface-visibility']='hidden';

        //$(sp.div_icon).addClass('iconFlash'); //背景大小和自身大小值变化的动画类在此无效
        sp.addEventListener('click',function(){
            if(self.onclick){
                self.onclick();
            }
        });
        sence.add3DObject(sp);
        sp.update();
    };
    self.addM();
};
function clickIcon(url, sg, y, h, R, trans, n, m, t,isHead,c)
{
    var self=this;
    BigSence.call(this,url, sg, y, h, R, trans, n, m, t,c);
    this.handleTextureLoaded=function(){
        self.init();
    }
}
/*var Music = document.getElementById("music");*/
///*var MusicApp={
    //isPlayInit:false,
    //audioid:null,
    //pause:function(){
     //   $("#musicSwitch").css("background-image","url("+wt.musicPause+")");
        //Music.pause();
        /*if(Tida.audio)
        {
            try{
                var sid = Tida.audio.pause(MusicApp.audioid);
            }
            catch(e){

            }
        }
        else
        {
            Music.pause();
        }*/
       // Music.pause();

      //  $("#music").removeClass("play");
    //},
    //resume:function(){
     //   $("#musicSwitch").css("background-image","url("+wt.musicPlay+")");
        /*if(Tida.audio) {

           try{
               var sid = Tida.audio.resume(MusicApp.audioid);
           }
            catch(e)
            {

            }
        }
        else {
            Music.play();
        }*/
       // Music.play();
      //  $("#music").addClass("play");
    //},
    //init:function(){
     //   $("#musicSwitch").hide();
        //lert(document.hidden);
       // Music.play();
        /*
        if(Tida.audio )
        {
            try{
                MusicApp.audioid= Tida.audio.play({
                    url:"//mblcce.file.alimmdn.com/Maybelline-music.mp3?t=1489031490918",
                    loop:1
                },function(){MusicApp.isPlayInit=true;});
            }
            catch (e){
                console.log('MMMPLAY');
                Music.play();
            }
        }
        else
        {
            Music.play();
        }*/
//天猫IOS4.9.1会支持循环播放
      //  $(document).bind('click',function(){
       //     if(MusicApp.isPlayInit)
        //    {
         //       return;
          //  }
           // else{
                //Music.play();
             //   MusicApp.isPlayInit=true;
           // }
        //});
        //$("#musicSwitch").bind("click", function(){
         //   if(Music.paused){
          //     MusicApp.resume();
           // }
            //else{
             //   MusicApp.pause();
            //}
        //});
        //document.addEventListener('visiblitychange',function(){
           // console.log(document.hidden);
          //  if((document).hidden)
           // {
            //    MusicApp.pause();
            //}
            //else {
             //   MusicApp.resume();
            //}
        //});
        //window.onunload=function(){
         //   MusicApp.pause();
        //};

        //Music.addEventListener('play',function(){MusicApp.isPlayInit=true;})
    //}
//};*/
$(document).ready(function(){
    controller.config();
    ui.init();
    ThreeD();
});