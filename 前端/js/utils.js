var TFC={
    tf:null,
    sws:[],
    init:function(){
        TFC.tf=new FaceTouch();
        TFC.tf.onrotate=function(obj)
        {
            orientationObj.toScale+=obj.scale;
        }
        TFC.tf.ontouchend=function(obj)
        {
            orientationObj.toScale=0;
            controller.isClick=false;
            for(var i=0;i<TFC.sws.length;i++)
            {
                TFC.sws[i].touchEnd(obj);
            }
        };
        TFC.tf.onmove=function(obj)
        {
            orientationObj.touchMove(obj);
            SSWiperManager.handleMove(obj);
            //$('.debug').html("Va "+JSON.stringify(obj));
            /*
            for(var i=0;i<TFC.sws.length;i++)
            {
                TFC.sws[i].touchMove(obj);
            }*/
        }

    }
}
var orientationObj={
    trigger:.8,
    minRtx:-5,
    maxRtx:0,
    dfAlpha:null,
    dfBeta:null,
    deGmma:null,
    tf:null,
    isTouches:null,
    touchScaleOffset:0,
    toScale:0,
    contentSc:1,
    toConentSc:1.7,

    init:function(){
        if (window.DeviceOrientationEvent){
            //window.addEventListener("deviceorientation", orientationObj.orientationHandler, false);
        };
        TFC.init();
    },
    touchMove:function(obj)
    {
        if(controller.eventDetailsState==true) return;
        controller.isClick=true;
        if(controller.navState == false && controller.eventDetailsState == false) {
            controller.cameraToRotateY -=obj.offsetx/10;
            controller.cameraToRotateX +=obj.offsety/10;
            if(controller.cameraToRotateX < orientationObj.minRtx){
                controller.cameraToRotateX = orientationObj.minRtx;
            }
            if(controller.cameraToRotateX > orientationObj.maxRtx){
                controller.cameraToRotateX = orientationObj.maxRtx;
            }
        }
        else{
            return;
        }
    },
    orientationHandler:function(event)
    {
        if(controller.eventDetailsState==true || controller.navState==true || controller.isClick==true)
        {
            return;
        }
        if(typeof orientationObj.dfAlpha === 'object'){
            orientationObj.dfAlpha = event.alpha;
            orientationObj.dfBeta = event.beta;
            orientationObj.deGmma=event.gamma;
        }
        if(event.alpha<90 && orientationObj.dfAlpha>270)
        {
            orientationObj.dfAlpha=360-orientationObj.dfAlpha;
        }
        else if(event.alpha>270 && orientationObj.dfAlpha<90)
        {
            orientationObj.dfAlpha=360+orientationObj.dfAlpha;
        }
        if(event.beta>90 && orientationObj.dfBeta<-90)
        {
            orientationObj.dfBeta=360+orientationObj.dfBeta;
        }
        else  if(event.beta<-90 && orientationObj.dfBeta>90)
        {
            orientationObj.dfBeta=-360+orientationObj.dfBeta;
        }
        var ortA = event.alpha - orientationObj.dfAlpha,
            ortB = event.beta - orientationObj.dfBeta,
            ortC=event.gamma-orientationObj.deGmma;
        //controller.cameraToRotateY=camera.rotatey=event.alpha;
        orientationObj.dfAlpha = event.alpha;
        // if(Math.abs(ortA) >= orientationObj.trigger){
       if(Math.abs(ortC)<2)
       {
           controller.cameraToRotateY+= ortC/2;

       }
        if(Math.abs(ortA)<3)
        {
            controller.cameraToRotateY+= ortA/2;
        }

        orientationObj.dfAlpha = event.alpha;
        orientationObj.deGmma=event.gamma;
        //}
        if(Math.abs(ortB) >= orientationObj.trigger){
            orientationObj.dfBeta = event.beta;
            var newRtx = controller.cameraToRotateX - ortB/2;
            if(newRtx < orientationObj.minRtx)
                controller.cameraToRotateX = orientationObj.minRtx;
            else if(newRtx > orientationObj.maxRtx)
                controller.cameraToRotateX = orientationObj.maxRtx;
            else
                controller.cameraToRotateX =newRtx;
        };
        ortA=ortB=ortC=null;
    }
};

var collectionlab={
    cwt:0,
    ly:0,
    zdy:0,
    lab:{},
    charge:function(id)
    {
        collectionlab.coll(id);
        if(collectionlab.cwt>=2){tipcon.visiblecwt()};
        if(collectionlab.ly>=4){tipcon.visibleLy()};
        if(collectionlab.zdy>=2){tipcon.visiblezdy()};
    },
    coll:function(id)
    {
       // if(!collectionlab.lab[id])
    }
}


var tipcon={
    lytip:null,
    cwttip:null,
    zdytip:null,
    //clickIcon(url, sg, y, h, R, trans, n, m, t,isHead);
    zdypro:null,
    cwtpro:null,
    lypro:null,
    showlytip:function()
    {
        // 268 275
        var person3Icon=new flyingIcon(50,400,300,1400,-10);
        this.lytip=new clickIcon('lyicon',30,400,180,1420,-3,3,false,4,false);
        //new clickIcon(wt.lyicon,30,400,180,1420,275,0,false,4,false);
        //tipcon.addLY();
        this.lytip.onclick=person3Icon.onclick=function(){
            PlayVideo('ly');
            controller.eventDetailsState=true;

        };
    },
    visibleLy:function()
    {
        this.lytip.show();
    },
    visiblecwt:function(){
        this.cwttip.show();
    },
    visiblezdy:function(){
        this.zdytip.show();
    },
    showcwttip:function(){
        //if(!this.cwttip)
        //{

            this.cwttip=new clickIcon('cwticon',30,580,180,1420,163,2,false,12,false);
            //this.cwttip.hide();
            var person2Icon=new flyingIcon(50,580,300,1400,156);
            //tipcon.addCWT();
            this.cwttip.onclick=person2Icon.onclick=function(){
                PlayVideo('cwt');
                controller.eventDetailsState=true;
            };
        //}
        //else
        //{
         //   return;
       // }
    },
    showzdytip:function(){
        //if(!this.zdytip)
        //{
            this.zdytip=new clickIcon('zdyicons',25,280,180,1300,275,2,false,43,false);
            var person1Icon=new flyingIcon(45,280,300,1250,266);
            //this.zdytip.hide();
            //tipcon.addZDY();
            this.zdytip.onclick=person1Icon.onclick=function(){
                PlayVideo('zdy');
                controller.eventDetailsState=true;
            }
        //}
        //else
        //{
         //   return;
       // }
    },
    addZDY:function(){
        //return;
        tipcon.zdypro=new madeProduct('zdy',[wt.product14]
              /*  wt.product8,
                wt.product9,
                wt.product10,
                wt.product11,
                wt.product12]*/,
            [{pid:1,video:''}]);
    },
    addCWT:function(){
       // return;
        tipcon.cwtpro=new madeProduct('cwt',[wt.product3], [{pid:1,video:''}]);
    },
    addLY:function(){
        //return;
        tipcon.lypro=new madeProduct('ly',[wt.product2,wt.product5],
            [{pid:1,video:''},{pid:2,more:'123'}]);
    }

};
function madeProduct(classname,arr,infos)
{
    var dom=$('.'+classname);
    var self=this;
    var str="";
    str+='<div class="swiper-wrapper">';
    for(var i=0;i<arr.length;i++)
    {
        str+='<div class="swiper-slide"><img src="'+arr[i]+'"></div>';
    }
    //str+='<div class="swiper-slide"><img src="img/stars/details/product3.png"></div>';
    //str+='<div class="swiper-slide"><img src="img/stars/details/product4.png"></div>';
    str+='</div>';
    //str+='<div class="pagination_content"><div class="pagination"></div></div>';
    str+='<div class="savebtns">';
    str+='<div class="savebtn"></div>';
    str+='<div class="playbtn"></div>';
    str+="</div>";
    str+='<div class="jiantoul jiantou"></div>';
    str+='<div class="jiantour jiantou"></div>';
    str+='<div class="closebtn" ></div>';
    //str+='<div class="provideocont">';
    //str+='<video width="538" height="312" id="videoplayer"></video>';
    //str+='<div class="playbtn"></div>';

    str+='</div>';
    dom.html(str);
    str=null;
    var swiper=new SSwiper('.'+classname,infos);
    //var swiper=Swiper('.'+classname,{autoplay: 1000,loop:true,paginationType:'bullets',pagination:'.pagination'});
    $('.products .closebtn').bind('click',function(){
        SSWiperManager.hideAll();
    });
    this.setCurrentIndex=function(index)
    {
        swiper.setCI(index)
    }

    /* <div class="swiper-wrapper">
     <div class="swiper-slide"><img src="img/stars/productshows-thumb.png"></div>
     <div class="swiper-slide"><img src="img/stars/productshows-thumb.png"></div>
     <div class="swiper-slide"><img src="img/stars/productshows-thumb.png"></div>
     </div>
     <div class="pagination_content"><div class="pagination"></div></div>
     <div class="savebtn"></div>
     <div class="provideocont">
     <video width="538" height="312" id="videoplayer"></video>
     <div class="playbtn"></div>
     </div>*/

}


function PlayVideo(videoype,index)
{
    switch(videoype)
    {
        case "ly":
            /*$('.videoPlace').css('background','url(img/pros/lybg.jpg)');
            video.src('video/zdy.mp4');
            video.play();*/
            if(!tipcon.lypro)
            {
                tipcon.addLY();
            }
            $('.productshow').show();
            $('.products').hide();
            //$('.ly').show();
            SSWiperManager.showSwiper('.ly');
            if(index || index==0)
            {
                tipcon.lypro.setCurrentIndex(index);
            };
            TRACKING.gaevent('Button_ product');
            break;
        case 'cwt':
            if(!tipcon.cwtpro)
            {
                tipcon.addCWT();
            }
            $('.productshow').show();
            $('.products').hide();
            //$('.cwt').show();
            SSWiperManager.showSwiper('.cwt');
            TRACKING.gaevent('Button_cwt');
            break;
        case 'zdy':
            if(!tipcon.zdypro)
            {
                tipcon.addZDY();
            }
            $('.productshow').show();
            $('.products').hide();
            //$('.zdy').show();
            SSWiperManager.showSwiper('.zdy');
            TRACKING.gaevent('Button_shanziNYFW');
            break;
    }
}
function handleTrick() {
    //console.log(controller.cameraToRotateY);

    if(controller.eventDetailsState==true)
   {
        SSWiperManager.update();
        return;
    }

    var rry=controller.cameraToRotateY;
    while(rry<0)
    {
        rry+=360;
    }
    if(controller.isClick==true && controller.eventDetailsState==false && controller.navState==false)
    {
        orientationObj.toConentSc=1.75;
    }
    else if(orientationObj.toScale>0)
    {
        var sc=orientationObj.toScale+1;
        sc=Math.max(sc,1);
        orientationObj.toConentSc=sc;
    }
    else
    {
        orientationObj.toConentSc=1.6;
    }
    var scspeed=(orientationObj.toConentSc - orientationObj.contentSc)*0.8;
    orientationObj.contentSc+=scspeed;

    var rotatespeedy;
    rotatespeedy=(controller.cameraToRotateY-camera.rotatey)*0.8;

    rotatespeedy=Math.min(20,rotatespeedy);
    rotatespeedy=Math.max(-20,rotatespeedy);
    var rotatespeedx=(controller.cameraToRotateX-camera.rotatex)*0.2;

    camera.rotatex+=rotatespeedx;
    camera.rotatey+=rotatespeedy;
    //camera.z+=(controller.cameraToZ-camera.z)*0.4;
    if(Math.abs(scspeed)>0.001)
    {
        $('#content').css('transform','scale3d('+orientationObj.contentSc+','+ orientationObj.contentSc+',1)');
    }
    sence.render();
    //console.log(rotatespeedx+"____"+rotatespeedy);
    SSWiperManager.update();
    scspeed=rotatespeedy=rotatespeedx=null;
};
var SSWiperManager={
    arr:{},
    currentone:null,
    addSwiper:function(swiper,id)
    {
        SSWiperManager.arr[id]=swiper;
        //SSWiperManager.arr.push(swiper);
    },
    update:function(){
        if(controller.eventDetailsState==false)
        {
            return;
        }
        /*for(var a in SSWiperManager.arr)
        {
            SSWiperManager.arr[a].update();
        }*/
        if(SSWiperManager.currentone)
        {
            SSWiperManager.currentone.update();
        }
    },
    hideAll:function()
    {
        SSWiperManager.currentone=null;
        $('.productshow').hide();
        controller.eventDetailsState=false;

    },
    showSwiper:function(id)
    {
        SSWiperManager.arr[id].dom.show();
        SSWiperManager.currentone= SSWiperManager.arr[id];
    },
    hideSwiper:function(id)
    {
        SSWiperManager.currentone.dom.hide();
        SSWiperManager.currentone=null;
    },
    handleMove:function(option)
    {
        if(SSWiperManager.currentone)
        {
            SSWiperManager.currentone.touchMove(option)
        }
    }
};
function SSwiper(classname,infos,currentIndex)
{
    this.savedpool={};
    this.dom=$(classname);
    SSWiperManager.addSwiper(this,classname);
    TFC.sws.push(this);
    //console.log(classname);
    var len=$(classname).find('.swiper-slide').length;

    //console.log(len);
    var self=this;
    this.items=[];
    var id="ID"+Math.random()*10;
    this.dom.attr('id',id);
    this.toX=0;
    this.currentX=currentIndex ||0;
    var favorOption={
        itemId:0,
        action: "add"
    };
    var left=this.dom.find('.jiantoul');
    var right=this.dom.find('.jiantour');
    var save=this.dom.find('.savebtn');
    var play=this.dom.find('.playbtn');
    $(classname).find('.swiper-slide').bind('touchstart',function(){
        //console.log(classname);
        switch(classname)
        {
            case ".zdy":
                playTmallVideo('http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/52759130.mp4');

                TRACKING.gaevent('Button_NYFWvideo');
                break;
            case ".cwt":
                playTmallVideo('http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/51756702.mp4');
                TRACKING.gaevent('Button_cwtvideo');
                break;
            case ".ly":
                if(self.currentIndex==0)
                {
                    playTmallVideo('http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/51756850.mp4');
                    TRACKING.gaevent('Button_LBvideo');
                }
                break;
        }
    });
    this.setCI=function(index)
    {
        var ci=self.currentIndex;
        var cii=ci%len;
        var offseti=index-cii;
        ci+=offseti;
        self.currentIndex=ci;
        self.toX=750*self.currentIndex;
    };
    switch(classname)
    {
        case ".cwt":
            //favorOption.action
            play.hide();
            save.css('margin-left','180px');
            save.addClass('savecwt');
            play.addClass('cwt_video');
            break;
        case ".ly":
            play.hide();
            save.css('margin-left','180px');
            break;
        case ".zdy":
            if(!tmallUser.isFan)
            {
                save.addClass('saveStore');
            }
            else {
                save.addClass('savedstore');
                self.savedpool[0]=1;
            }

            save.css('margin-left','180px');
            //save.hide();
            play.hide();
            console.log('ssss');
            break;
    }
    if(len<=1)
    {
        left.hide();
        right.hide();
    }
    this.currentIndex=0;
    left.bind('touchstart',function(){

        self.playPrev();
    });
    right.bind('touchstart',function(){
        self.playNext();
    });
    save.bind('touchstart',function(){
        //获取index;

        switch(classname)
        {
            case '.cwt':

                if(self.savedpool[0]==1)
                {
                    return;
                };
                favorOption.itemId='541236751066';
                Tida.itemFavor(favorOption,function(data){
                    if(data.ret=='HY_SUCCESS' || data.errorType==3 || data.errorCode=='3002')
                    {
                        //alert("!!!!!!"+JSON.stringify(data));
                        save.removeClass('savecwt');
                        save.addClass('saved');
                        self.savedpool[0]=1;
                    }
                    else
                    {
                        //alert(JSON.stringify(data));
                    }
                });
                TRACKING.gaevent('Button_cwtcollect');
                break;
            case ".ly":
                currentIndex=self.getCurrentIndex();
                if(self.savedpool[currentIndex]==1)
                {
                    return;
                }
                if(currentIndex==0)
                {
                    favorOption.itemId='544867810896';
                    Tida.itemFavor(favorOption,function(data){
                        if(data.ret=='HY_SUCCESS' || data.errorType==3 || data.errorCode=='3002')
                        {
                            save.addClass('saved');
                            self.savedpool[0]=1;
                        }
                        else{
                           // alert(JSON.stringify(data));
                        }
                    });
                    TRACKING.gaevent('Button_LBcollect');
                }
                else if(currentIndex==1)
                {
                    favorOption.itemId='544711312521';
                    Tida.itemFavor(favorOption,function(data){
                        if(data.ret=='HY_SUCCESS' || data.errorType==3 || data.errorCode=='3002')
                        {
                            //alert("!!!!!!"+JSON.stringify(data));
                            save.addClass('saved');
                            self.savedpool[1]=1;
                        }
                        else{
                            //alert(JSON.stringify(data));
                        }
                    });
                    TRACKING.gaevent('Button_Erasercollect');
                }
                break;
            case ".zdy":

                if(self.savedpool[0]==1)
                {
                    return;
                };
                followStore(function(data)
                {
                    //alert(JSON.stringify(data));
                    if(data.followStatus==true)
                    {
                        save.addClass('savedstore');
                        self.savedpool[0]=1;
                    }
                    else{
                        //alert(JSON.stringify(data));
                        save.addClass('savedstore');
                        self.savedpool[0]=1;
                    }
                });
                TRACKING.gaevent('Button_collectstore');
                break;
        };
        self.currentIndex=self.getCurrentIndex();
        //console.log(self.currentIndex);
    });
    play.bind('touchstart',function(){
        //获取index
        self.currentIndex=self.getCurrentIndex();
        console.log(self.currentIndex);
        if(infos[self.currentIndex]['more'])
        {
            //$('.info').show();
        }
        else
        {
           switch(classname){
               case ".cwt":

                   playTmallVideo('http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/51756702.mp4');
                   break;
               case '.ly':

                   playTmallVideo('http://cloud.video.taobao.com/play/u/3129324064/p/1/e/6/t/1/51756850.mp4');

                   break;
           }
        }
    });
    this.getCurrentIndex=function(){
        if(len==1)
        {
            return 0;
        }
        var oox=parseInt(self.toX/750);
        while(oox<0)
        {
            oox+=len;
        };
        var index=oox%len;
        /*if(infos[index]['more'])
        {
            play.addClass('morebtn');
            play.hide();
            save.css('margin-left','180px');
        }
        else
        {
            play.removeClass('morebtn');
            if(classname=='.ly')
            {
                play.show();
            }

            save.css('margin-left','0px');
        };*/
        if(self.savedpool[oox%len]==1)
        {
            save.addClass('saved');
        }
        else
        {
            save.removeClass('saved');
        }
        return oox%len;
    };
    this.playNext=function(){
        if(len==1)
        {
            self.currentIndex=0;
            return;
        }
        var oox=parseInt(self.toX/750);
        oox--;
        self.toX=oox*750;
        self.currentIndex=self.getCurrentIndex();
    };
    this.playPrev=function()
    {
        if(len==1)
        {
            self.currentIndex=0;
            return;
        }
        var oox=parseInt(self.toX/750);
        oox++;
        self.toX=oox*750;
        self.currentIndex=self.getCurrentIndex();
    };
    for(var i=0;i<len;i++)
    {
        var item=$(classname).find('.swiper-slide').eq(i);
        var w=750;
        item.xx=i*w;
        //item.css('left',item.xx+"px");
        item.css('transform','translate('+item.xx+'px,0px)');
        item.css('-ms-transform','translate('+item.xx+'px,0px)');
        item.css('-o-transform','translate('+item.xx+'px,0px)');
        item.css('-moz-transform','translate('+item.xx+'px,0px)');
        item.css('-webkit-transform','translate('+item.xx+'px,0px)');
        self.items.push(item);
        item=null;
        w=null;
    };
    this.touchMove=function(option){
        //console.log(option);
        //$(".debug").html("VA "+JSON.stringify(option));
        self.toX-=option.offsetx;
    };
    this.touchEnd=function(option)
    {
        if(self.dom.css('display')=='none')
        {
            return;
        }
        if(len==1)
        {
            self.toX=0;
        }
        if(option.offsetx>10)
        {
            self.playNext();
            return;
        }
        else if(option.offsetx<-10)
        {
            self.playPrev();
            return;
        }
        var offsetr=(self.toX)%750;
        var offset=750;
        var oox=parseInt(self.toX/750);
        var odxx=self.toX%750;
        //if()
        if(odxx>200)
        {
            self.toX=(oox+1)*750;
        }
        else if(odxx<200 && odxx>0)
        {
            self.toX=oox*750;
        }
        else if(odxx<-200)
        {
            self.toX=(oox-1)*750;
        }
        else if(odxx>-200 && odxx<0)
        {
            self.toX=oox*750;
        };
        self.currentIndex=self.getCurrentIndex();
        offsetr=offset=oox=odxx=null;
    }

    this.update=function()
    {
        //console.log(123);
        if(self.dom.css('display')=='none')
        {
            return;
        }
        var speed=(self.toX-self.currentX)*0.6;
        self.currentX+=speed;
        if(self.items.length==0){
            return;
        };
        for(var i=0;i<self.items.length;i++)
        {
            //console.log(i+"->");
            var itemleft=self.items[i].xx;
            itemleft+=speed;
            self.items[i].xx=itemleft;
            if(itemleft>=-750 && itemleft<=750)
            {
                //self.items[i].css('left',itemleft+'px');
                self.items[i].css('transform','translate('+itemleft+'px,0px)');
                self.items[i].css('-webkit-transform','translate('+itemleft+'px,0px)');
                self.items[i].css('-o-transform','translate('+itemleft+'px,0px)');
                self.items[i].css('-moz-transform','translate('+itemleft+'px,0px)');
                self.items[i].css('-ms-transform','translate('+itemleft+'px,0px)');
            }
            else {
                self.items[i].css('transform','translate(750px,0px)');
                self.items[i].css('-webkit-transform','translate(750px,0px)');
                self.items[i].css('-o-transform','translate(750px,0px)');
                self.items[i].css('-moz-transform','translate(750px,0px)');
                self.items[i].css('-ms-transform','translate(750px,0px)');
            }
            itemleft=null;
        };
        self.items.sort(sf);
        var len=self.items.length;
        var mmx=1500;
        if(len==2)
        {
            mmx=750;
        }
        if(self.items[len-1].xx>mmx)
        {
            self.items[len-1].xx=self.items[0].xx-750;
        }
        if(self.items[0].xx<-750)
        {
            self.items[0].xx=self.items[len-1].xx+750;
        }
        function sf(a,b)
        {
            if(a.xx> b.xx)
            {
                return 1;
            }
            else {
                return -1;
            }
        }
        len=null;
        mmx=null;
    };
    //console.log(items);
}