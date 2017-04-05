/**
 * Created by shin on 2017/3/11.
 */
function ThreeD(){
    //代码为DEOM
    //实际项目编写需遵守 obj.do()的方法去执行代码
    //初始化 贴图管理
    //贴图加载完成事件
    //SenceManager类
    $('.contenparent').show();
    sence = new SenceManager();
    camera = new Camera();
    camera.x = 500;
    camera.y = -100;
    camera.z = 0;
    var addR = 1000;
    sence.addCamrea(camera);
    var bsnumber=14;
    var bs = new BigSence('background', bsnumber, 0, 3200, 2000, 0, bsnumber, true, 0,makePro1);

    //var bs2 = new BigSence(wt.background, bsnumber, 0, 1400, 1500, 0, bsnumber, true, 0);
    //url, sg, y, h, R, trans, n, m, t
    //张大奕
    //ex start
    //var car = new BigSence(wt.car, 30, 600, 700, 1700, 101, 5, false, 0);
    // 陈伟霆
    //
    //

    $('.info .closebtn').bind('click',function(){
        $('.info').hide();
    });
    //bs=person1=person2=streetlight=person3=pro1=pro2=null;

};
function makePerson1()
{
        setTimeout(function(){
            var person1 = new BigSence('zdy', 36, 380, 2400, 1500, 265, 4, false, 0,makePerson2);
            person1.onclick=function(){
                PlayVideo('zdy');
                controller.eventDetailsState=true;
            };
        },100);
}
function makePerson2()
{

    setTimeout(function(){
        var person2 = new BigSence('cwt', 35, 700, 2400, 1600, 153, 4, false, 0,makePerson3);
        person2.onclick=function(){
            PlayVideo('cwt');
            controller.eventDetailsState=true;
        };

    },100)




}
function makePerson3()
{

    setTimeout(function(){
        var person3 = new BigSence('ly', 35, 150, 1500, 1600, 20, 3, false, 0,makeStreetLight);
        person3.onclick=function(){
            PlayVideo('ly');
            controller.eventDetailsState=true;
        };
    },100)




}
function makeStreetLight()
{

    setTimeout(function(){
        var streetlight = new BigSence('streetlight', 14, 0, 3000, 1550, 50, 1, false, 0,makeDone);
    },100)
}
function makePro1()
{
    setTimeout(function(){
        var pro1 = new BigSence('pro1', 15, 450, 800, 1500, 11, 1, false, 0, makePro2);
        pro1.onclick = function () {
            PlayVideo('ly', 0);
            controller.eventDetailsState = true;
        };
    },100)
}
function makePro2()
{
    setTimeout(function(){
        var pro2=new BigSence('pro2', 25, 360, 800, 1500, 1, 1, false, 0,makeTip);
        pro2.onclick=function(){
            PlayVideo('ly',1);
            controller.eventDetailsState=true;
        };
    },100)
}
function makeTip()
{
    tipcon.showzdytip();
    tipcon.showcwttip();
    tipcon.showlytip();
    makePerson1();

}
function makeDone()
{
    MainTimeLine.getInstance().addEventListener('trick',handleTrick);
    $('.thumb').remove();
}