var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MF_EVENT;
(function (MF_EVENT) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.eventLip = {};
        }
        EventDispatcher.prototype.onEvent = function (eventtype, fun) {
            this.addEventListener(eventtype, fun);
        };
        EventDispatcher.prototype.moveEvent = function (eventtype, fun) {
            this.removeEventListener(eventtype, fun);
        };
        EventDispatcher.prototype.addEventListener = function (eventtype, fun) {
            if (!this.eventLip[eventtype]) {
                this.eventLip[eventtype] = new Array();
            }
            if (this.contains(eventtype, fun))
                return;
            this.eventLip[eventtype].push(fun);
        };
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var arr = this.eventLip[event.type];
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var f = arr[i];
                    event.target = this;
                    f(event);
                }
            }
        };
        EventDispatcher.prototype.contains = function (eventtype, fun) {
            for (var i = 0; i < this.eventLip[eventtype].length; i++) {
                if (this.eventLip[eventtype][i] == fun) {
                    return true;
                }
                ;
            }
            return false;
        };
        ;
        EventDispatcher.prototype.removeEventListener = function (eventtype, fun) {
            var arr = this.eventLip[eventtype];
            if (!arr)
                return;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == fun) {
                    arr.splice(i);
                }
            }
            arr=null;
        };
        return EventDispatcher;
    }());
    MF_EVENT.EventDispatcher = EventDispatcher;
})(MF_EVENT || (MF_EVENT = {}));
var MF_EVENT;
(function (MF_EVENT) {
    var Event = (function () {
        function Event(type, data) {
            if (data === void 0) { data = null; }
            this.type = type;
            this.data = data;
        }
        return Event;
    }());
    MF_EVENT.Event = Event;
})(MF_EVENT || (MF_EVENT = {}));
var target3d = (function (_super) {
    __extends(target3d, _super);
    function target3d() {
        _super.call(this);
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._rotatex = 0;
        this._rotatey = 0;
        this._rotatez = 0;
        this.transform_result = '';
    }
    Object.defineProperty(target3d.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (val) {
            this._x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(target3d.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (val) {
            this._y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(target3d.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (val) {
            this._z = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(target3d.prototype, "rotatex", {
        get: function () {
            return this._rotatex;
        },
        set: function (val) {
            this._rotatex = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(target3d.prototype, "rotatey", {
        get: function () {
            return this._rotatey;
        },
        set: function (val) {
            this._rotatey = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(target3d.prototype, "rotatez", {
        get: function () {
            return this._rotatez;
        },
        set: function (val) {
            this._rotatez = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(target3d.prototype, "transform", {
        get: function () {
            return "translate3d(" + this.x + "px," + this.y + "px," + this.z + "px) rotateX(" + this._rotatex + "deg) rotateY(" + this._rotatey + "deg) rotateZ(" + this._rotatez + "deg)";
        },
        enumerable: true,
        configurable: true
    });
    return target3d;
}(MF_EVENT.EventDispatcher));
var SenceOffsetOption = (function () {
    function SenceOffsetOption() {
    }
    return SenceOffsetOption;
}());
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        _super.call(this);
        this.viewportW = 1000;
        this.viewportH = 1000;
        this.offset_rotatey = 0;
        this.option = new SenceOffsetOption();
    }
    Camera.prototype.caca = function (obj) {
        var tempobj = {};
        tempobj.x = obj.x;
        tempobj.y = obj.y;
        tempobj.z = obj.z;
        tempobj.rotatey = obj.rotatey;
        this.changeToLocalPo(tempobj);
        this.rotateAtY(this.rotatey, tempobj);
        this.rotateAtX(this.rotatex, tempobj);
        this.option.x = tempobj.x + this.viewportW / 2;
        this.option.y = tempobj.y + this.viewportH / 2;
        this.option.z = tempobj.z;
        this.option.offsetrotatey = this.rotatey;
        this.option.offsetrotatex = this.rotatex;
        tempobj=null;
        return this.option;
    };
    Camera.prototype.caca2 = function (obj) {
    };
    Camera.prototype.changeToLocalPo = function (po) {
        po.x = po.x - this.x;
        po.y = po.y - this.y;
        po.z = po.z - this.z;
    };
    Camera.prototype.changeToGlobalPo = function (po) {
        po.x = po.x + this.x;
        po.y = po.y + this.y;
        po.z = po.z + this.z;
    };
    Camera.prototype.rotateAtY = function (ry, obj) {
        var cosY = Math.cos(ry / 180 * Math.PI);
        var sinY = Math.sin(ry / 180 * Math.PI);
        var x1 = obj.x * cosY - obj.z * sinY;
        var z1 = obj.z * cosY + obj.x * sinY;
        obj.x = x1;
        obj.z = z1;
        cosY=sinY=x1=z1=null;
    };
    Camera.prototype.rotateAtX = function (rz, obj) {
        var cosX = Math.cos(rz / 180 * Math.PI);
        var sinX = Math.sin(rz / 180 * Math.PI);
        var y1 = obj.y * cosX - obj.z * sinX;
        var z1 = obj.z * cosX + obj.y * sinX;
        obj.y = y1;
        obj.z = z1;
        cosX=sinX=y1=z1=null;
    };
    Object.defineProperty(Camera.prototype, "rotatey", {
        get: function () {
            return this._rotatey;
        },
        set: function (val) {
            this.offset_rotatey = val - this.rotatey;
            this._rotatey = val;
        },
        enumerable: true,
        configurable: true
    });
    return Camera;
}(target3d));
var Sprite3D = (function (_super) {
    __extends(Sprite3D, _super);
    function Sprite3D(w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        _super.call(this);
        this.center_dis = 400;
        this.divcontent = document.createElement('div');
        this.divcontent.setAttribute('class','sprite3d');
        //classname sprite3d
        /*this.divcontent.style['-webkit-backface-visibility'] = 'hidden';
        this.divcontent.style['-o-backface-visibility'] = 'hidden';
        this.divcontent.style['-ms-backface-visibility'] = 'hidden';
        this.divcontent.style['-moz-backface-visibility'] = 'hidden';
        this.divcontent.style['backface-visibility'] = 'hidden';
        this.divcontent.style['position'] = 'absolute';
        this.divcontent.style['transform-origin'] = '50% 50%';
        this.divcontent.style['-webkit-transform-origin'] = '50% 50%';
        this.divcontent.style['-o-transform-origin'] = '50% 50%';
        this.divcontent.style['-ms-transform-origin'] = '50% 50%';
        this.divcontent.style['-moz-transform-origin'] = '50% 50%';*/
        this.width = w;
        this.height = h;
    }
    Object.defineProperty(Sprite3D.prototype, "content", {
        get: function () {
            return this.divcontent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "camera", {
        set: function (cam) {
            this._myCamera = cam;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "textureByUrl", {
        set: function (url) {
            this.makeMM();
            this.div_icon.style.backgroundImage = "url(" + url + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "textureByBase64", {
        set: function (data) {
            this.makeMM();
            this.div_icon.style.backgroundImage = "url(" + data + ")";
            this.div_icon.style.backgroundSize = "100% 100%";
            //this.div_icon.src=data;
        },
        enumerable: true,
        configurable: true
    });
    Sprite3D.prototype.makeMM = function () {
        if (!this.div_icon) {
            this.div_icon = document.createElement('div');
            this.div_icon.style.position = 'absolute';
            this.div_icon.style['-webkit-transform-style']='preserve-3d';
            this.div_icon.style['transform-style']='preserve-3d';
            this.div_icon.style['-o-transform-style']='preserve-3d';
            this.div_icon.style['-ms-transform-style']='preserve-3d';
            this.div_icon.style['-moz-transform-style']='preserve-3d';
            this.divcontent.appendChild(this.div_icon);
        }
        this.div_icon.style.width = this.width + "px";
        this.div_icon.style.height = this.height + "px";
        this.div_icon.style.top = -this.height / 2 + "px";
        this.div_icon.style.left = -this.width / 2 + "px";
    };
    Object.defineProperty(Sprite3D.prototype, "backgroudcolor", {
        set: function (color) {
            this.makeMM();
            this.div_icon.style.backgroundColor = "#" + color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "width", {
        get: function () {
            return this._w;
        },
        set: function (val) {
            this._w = val;
            this.makeMM();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "height", {
        get: function () {
            return this._h;
        },
        set: function (val) {
            this._h = val;
            this.makeMM();
        },
        enumerable: true,
        configurable: true
    });
    Sprite3D.prototype.update = function () {
        if (this._myCamera) {
            this.updateoption = this._myCamera.caca(this);
        }
        ;
        this.divcontent.style['transform'] = this.transform;
        this.divcontent.style['-webkit-transform'] = this.transform;
        this.divcontent.style['-o-transform'] = this.transform;
        this.divcontent.style['-moz-transform'] = this.transform;
        this.divcontent.style['-ms-transform'] = this.transform;


        this.divcontent.style['-webkit-transform-style']='preserve-3d';
        this.divcontent.style['transform-style']='preserve-3d';
        this.divcontent.style['-o-transform-style']='preserve-3d';
        this.divcontent.style['-ms-transform-style']='preserve-3d';
        this.divcontent.style['-moz-transform-style']='preserve-3d';

        if (this.SenceZ > 1000) {
        }
        else {
        }
    };
    Sprite3D.prototype.HandleClick = function () {
        this.dispatchEvent(new MF_EVENT.Event('click'));
    };
    Sprite3D.prototype.needrender = function () {
        return true;
    };
    Sprite3D.prototype.addMeAt = function (parent) {
        var _this = this;
        parent.appendChild(this.divcontent);

        this.divcontent.addEventListener('click', function (e) {_this.HandleClick(); },true);
    };
    Object.defineProperty(Sprite3D.prototype, "SenceX", {
        get: function () {
            if (this.updateoption) {
                return this.updateoption.x;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "SenceY", {
        get: function () {
            if (this.updateoption) {
                return this.updateoption.y;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "SenceZ", {
        get: function () {
            if (this.updateoption) {
                return this.updateoption.z;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "SenceRotateX", {
        get: function () {
            if (this.updateoption) {
                return this.rotatex + this.updateoption.offsetrotatex;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "SenceRotateY", {
        get: function () {
            if (this.updateoption) {
                return this.rotatey - this.updateoption.offsetrotatey;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "SenceRotateZ", {
        get: function () {
            return this.rotatez;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "SenceScale", {
        get: function () {
            return this._myCamera.z - this.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite3D.prototype, "transform", {
        get: function () {
            if (!this.needrender())
                return "";
            return "translate3d(" + this.SenceX + "px," + this.SenceY + "px," + this.SenceZ + "px) rotateX(" + this.SenceRotateX + "deg) rotateY(" + this.SenceRotateY + "deg) rotateZ(" + this.SenceRotateZ + "deg)";
        },
        enumerable: true,
        configurable: true
    });
    return Sprite3D;
}(target3d));
var Sprite3DContainer = (function (_super) {
    __extends(Sprite3DContainer, _super);
    function Sprite3DContainer() {
        _super.call(this);
        this.childrens = new Array();
        this.divcontent.style['perspective'] = '1000px';
        this.divcontent.style['background'] = '';
        this.z = -600;
    }
    Sprite3DContainer.prototype.addChild = function (obj) {
        this.childrens.push(obj);
        obj.addMeAt(this.content);
    };
    Sprite3DContainer.prototype.update = function () {
        _super.prototype.update.call(this);
        for (var i = 0; i < this.childrens.length; i++) {
            this.childrens[i].update();
        }
        i=null;
    };
    return Sprite3DContainer;
}(Sprite3D));
var mm={
    now:0,
    then:0,
    count:function(){
        MainTimeLine.getInstance().count();
    }
};
var MainTimeLine = (function (_super) {
    __extends(MainTimeLine, _super);
    function MainTimeLine() {
        _super.call(this);
        this.starting();
    };
    MainTimeLine.prototype.now=0;
    MainTimeLine.prototype.then=9;
    MainTimeLine.prototype.starting = function () {

        mm.then=mm.now=Date.now();
        this.count();

    };
    MainTimeLine.getInstance = function () {
        if (!MainTimeLine.instance) {
            MainTimeLine.instance = new MainTimeLine();
        }
        return MainTimeLine.instance;
    };
    MainTimeLine.prototype.now=0;
    MainTimeLine.prototype.then=0;
    MainTimeLine.prototype.count = function () {

        mm.now=Date.now();
        if(mm.now-mm.then>=1000/60)
        {
            MainTimeLine.getInstance().dispatchEvent(new MF_EVENT.Event('trick'));
            mm.then=Date.now();
        }
        //MainTimeLine.instance.dispatchEvent(new MF_EVENT.Event('trick'))
        requestAnimationFrame(mm.count);

        //setInterval(function(){MainTimeLine.instance.dispatchEvent(new MF_EVENT.Event('trick'));},50);
        /*
        if(isMobile.iOS())
        {
            setInterval(function(){MainTimeLine.instance.dispatchEvent(new MF_EVENT.Event('trick'));},50);
        }
        else
        {
            var ts = new Date().getTime();
            var millisecond1 = 0;
            setTimeout(function countdown() {
                var millisecond = millisecond1 + new Date().getTime() - ts;
                millisecond += MainTimeLine.timestep;
                MainTimeLine.timestamp = millisecond;
                MainTimeLine.instance.dispatchEvent(new MF_EVENT.Event('trick'));
                setTimeout(countdown, MainTimeLine.timestep);
            }, 50);
        }*/
        //setInterval(function(){MainTimeLine.instance.dispatchEvent(new MF_EVENT.Event('trick'));},50);
    };
    MainTimeLine.timestep = 50;
    MainTimeLine.timestamp = 0;
    return MainTimeLine;
}(MF_EVENT.EventDispatcher));
var tempCameraObj={
    rotatex:0,
    rotatey:0,
    rotatez:0
};
var SenceManager = (function () {
    function SenceManager(perspective) {
        if (perspective === void 0) { perspective = 1500; }
        this.sprites = new Array();
        this.stage = document.createElement('div');
        document.getElementById('content').appendChild(this.stage);
        document.getElementById('content').style.perspective=
            document.getElementById('content').style['-webkit-perspective']=
                document.getElementById('content').style['-o-perspective']=
                    document.getElementById('content').style['-ms-perspective']=
                        document.getElementById('content').style['-os-perspective']=perspective;
        document.getElementById('content').style['background'] = '#000';
        /*document.getElementById('content').style['-webkit-transition'] =
            document.getElementById('content').style['transition'] =
                document.getElementById('content').style['-moz-transition'] =
                    document.getElementById('content').style['-o-transition'] =
                        document.getElementById('content').style['-ms-transition'] = 'perspective 6s';*/
        this.stage.setAttribute('class','spritestage')
    }
    SenceManager.prototype.add3DObject = function (sp) {
        this.sprites.push(sp);
        if (this.camera) {
            sp.camera = this.camera;
        }
        sp.addMeAt(this.stage);
    };
    SenceManager.prototype.render = function () {


        //$('.debug').show();
        if(tempCameraObj.rotatex==this.camera.rotatex &&
            tempCameraObj.rotatey==this.camera.rotatey &&
            tempCameraObj.rotatez==this.camera.rotatez)
        {
            return;
        }
        var rotatex = parseInt(-this.camera.rotatex*1000)/1000;
        var rotatey = parseInt(-this.camera.rotatey*100)/100;
        var rotatez = parseInt(-this.camera.rotatez*100)/100;
        rotatex=this.uodateRotate(rotatex);
        rotatey=this.uodateRotate(rotatey);
        rotatez=this.uodateRotate(rotatez);
        //$('.debug').text('RX:'+(rotatex)+" RY:"+(rotatey));
        var trans = "rotateX(" + rotatex + "deg) rotateY(" + rotatey + "deg) rotateZ(" + rotatez + "deg)";
        this.stage.style['transform'] = trans;
        this.stage.style['-webkit-transform'] = trans;
        this.stage.style['-o-transform'] = trans;
        this.stage.style['-moz-transform'] = trans;
        this.stage.style['-ms-transform'] = trans;
        tempCameraObj.rotatex=this.camera.rotatex;
        tempCameraObj.rotatey=this.camera.rotatey;
        tempCameraObj.rotatez=this.camera.rotatez;
        /*this.stage.style['-webkit-transform-style']='preserve-3d';
        this.stage.style['transform-style']='preserve-3d';
        this.stage.style['-o-transform-style']='preserve-3d';
        this.stage.style['-ms-transform-style']='preserve-3d';
        this.stage.style['-moz-transform-style']='preserve-3d';*/
        rotatex=rotatey=rotatez=trans=null;
    };
    SenceManager.prototype.uodateRotate=function(rotate)
    {
        /*f(rotate>360)
        {
            rotate-=360;
        }*/
        while(rotate>360)
        {
            rotate-=360;
        }
        while(rotate<0)
        {
            rotate+=360;
        }
        return rotate;
    }
    SenceManager.prototype.addCamrea = function (camera) {
        this.camera = camera;
        /*for (var c = 0; c < this.sprites.length; c++) {
            this.sprites[c].camera = camera;
        }*/
    };
    return SenceManager;
}());
var TextureManager = (function (_super) {
    __extends(TextureManager, _super);
    function TextureManager() {
        _super.call(this);
        this.can = document.createElement('canvas');

    }
    TextureManager.prototype.loadTextrure = function (str) {
        var _this = this;
        this.imgoader = document.createElement('img');
        this.imgoader.crossOrigin = "Anonymous";
        TextureManager.loadnumber++;
        this.imgoader.src = str;
        this.imgoader.onload = function (e) { _this.handleImgLoaded(e); };

    };
    TextureManager.prototype.drawImage=function(img)
    {
        var _this = this;
        this.imgoader=img;
        this.imgoader.crossOrigin = "Anonymous";
        TextureManager.loadnumber++;
        //console.log(img);
        //console.log(img+"____"+img.readyState+"___"+img.complete);
        if(img.complete)
        {
            _this.dispatchEvent(new MF_EVENT.Event('textureloaded'));
        }
        else{
            this.imgoader.onload = function (e) { _this.handleImgLoaded(e); };
        };


    };
    TextureManager.prototype.handleImgLoaded = function (e) {
        this.dispatchEvent(new MF_EVENT.Event('textureloaded'));
    };
    TextureManager.prototype.dispose = function () {
        this.can = null;
        this.context = null;
        this.imgoader.onload = null;
        this.imgoader = null;
    };
    TextureManager.prototype.getTexture = function (rect, showData) {
        if (showData === void 0) { showData = false; }
        var temocan = this.can;
        var canw = this.imgoader.width * rect.wp;
        var canh = this.imgoader.height * rect.hp;
        temocan.width = canw;
        temocan.height = canh;
        if (!this.context) {
            this.context = this.can.getContext('2d');
            this.context = this.can.getContext('2d');
        };
        this.context.drawImage(this.imgoader, this.imgoader.width * rect.xp, this.imgoader.height * rect.yp, canw, canh, 0, 0, canw, canh);
        if(isMobile.notiOS())
        {
            var data = temocan.toDataURL('image/png');
        }
        else{
            var data = temocan.toDataURL('image/webp',0.6);
        }

        if (showData) {
            console.log(data);
        };
        temocan=canw=canh=null;
        return data;
    };
    TextureManager.loadnumber = 0;
    return TextureManager;
}(MF_EVENT.EventDispatcher));
var Point3D = (function () {
    function Point3D() {
        this._x = 0;
        this._y = 0;
        this._z = 0;
    }
    Object.defineProperty(Point3D.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (val) {
            this._x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point3D.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (val) {
            this._y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point3D.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (val) {
            this._z = val;
        },
        enumerable: true,
        configurable: true
    });
    return Point3D;
}());
//# sourceMappingURL=S3D.js.map