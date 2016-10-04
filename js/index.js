function Shape(canvas,cobj,rubberson) {
    this.canvas=canvas;
    this.canvasW=this.canvas.width;
    this.canvasH=this.canvas.height;
    this.cobj=cobj;
    this.history=[];
    this.type="pencil";
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.style="stroke";
    this.side=10;
    this.rubbersize=10;
    this.rubberson=rubberson;
}
Shape.prototype= {
    init:function () {
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
    },
    draw:function () {
        var that=this;
        that.canvas.onmousedown=function(e){
            that.init();
            var ev=e||window.event;
            var startx=ev.offsetX;
            var starty=ev.offsetY;
            var endx,endy;
            if(that.type=="pencil"||"rubber"){
                that.cobj.moveTo(startx,starty);
                that.cobj.beginPath();
            }
            that.canvas.onmousemove=function(e){
                var ev=e||window.event;
                endx=ev.offsetX;
                endy=ev.offsetY;
                that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
                that[that.type](startx,starty,endx,endy);
            };
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    back:function () {
        if(this.history.length==0){
            alert("不能返回")
        }
        if(this.history.length==1){
            this.history.pop();
            this.cobj.clearRect(0,0,this.canvasW,this.canvasH);
        }else{
            this.history.pop();
            this.cobj.putImageData(this.history[this.history.length-1],0,0)
        }
    },
    pencil:function (startx,starty,endx,endy) {
        this.cobj.lineTo(endx,endy);
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.stroke();
    },
    line:function (startx,starty,endx,endy) {
        this.cobj.beginPath();
        this.cobj.moveTo(startx,starty);
        this.cobj.lineTo(endx,endy);
        this.cobj.stroke();
    },
    rect:function (startx,starty,endx,endy) {
        this.cobj.beginPath();
        //this.cobj.lineJoin="round";
        this.cobj.rect(startx,starty,endx-startx,endy-starty);
        this.cobj[this.style]();
    },
    arc:function (startx,starty,endx,endy) {
        this.cobj.beginPath();
        var cr=Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
        this.cobj.arc(startx,starty,cr,0,2*Math.PI);
        this.cobj[this.style]();
    },
    clear:function(){
        this.cobj.clearRect(0,0,this.canvasW,this.canvasH);
        this.history=[];
    },
    polygon:function(startx,starty,endx,endy){
        this.cobj.beginPath();
        var r=Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
        var n=this.side;
        var angle=360/n;
        for(var i=0;i<n;i++){
            this.cobj.lineTo(startx+Math.cos(Math.PI/180*angle*i)*r,starty+Math.sin(Math.PI/180*angle*i)*r);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    star:function(startx,starty,endx,endy){
        this.cobj.beginPath();
        var outr=Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
        var inr=outr*0.35;
        var n=this.side*2;
        var angle=360/n;
        for(var i=0;i<n;i++){
            if(i%2==0){
                this.cobj.lineTo(startx+Math.cos(Math.PI/180*angle*i)*outr,starty+Math.sin(Math.PI/180*angle*i)*outr);
            }else{
                this.cobj.lineTo(startx+Math.cos(Math.PI/180*angle*i)*inr,starty+Math.sin(Math.PI/180*angle*i)*inr);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    rubber:function(){
        var that=this;
        that.canvas.onmousemove=function(e){
                var ev=e||window.event;
                ev.preventDefault()
                var ex=ev.offsetX;
                var ey=ev.offsetY;
                var left=ex-that.rubbersize/2
                var top=ey-that.rubbersize/2
                if(left<0){
                    left=0;
                }
                if(left>that.canvasW-that.rubbersize){
                    left=that.canvasW-that.rubbersize
                }
                if(top<0){
                    top=0;
                }
                if(top>that.canvasH-that.rubbersize){
                    top=that.canvasH-that.rubbersize
                }                    
                that.rubberson.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.rubbersize+"px;height:"+that.rubbersize+"px";
                that.cobj.clearRect(left,top,that.rubbersize,that.rubbersize);
        }
        that.canvas.onmousedown=function(e){
            var ev=e||window.event;
            ev.preventDefault()         
            that.canvas.onmousemove=function(e){
                    var ev=e||window.event;
                    ev.preventDefault()
                    var ex=ev.offsetX;
                    var ey=ev.offsetY;
                    var left=ex-that.rubbersize/2
                    var top=ey-that.rubbersize/2
                    if(left<0){
                        left=0;
                    }
                    if(left>that.canvasW-that.rubbersize){
                        left=that.canvasW-that.rubbersize
                    }
                    if(top<0){
                        top=0;
                    }
                    if(top>that.canvasH-that.rubbersize){
                        top=that.canvasH-that.rubbersize
                    }                    
                    that.rubberson.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.rubbersize+"px;height:"+that.rubbersize+"px";
                    that.cobj.clearRect(left,top,that.rubbersize,that.rubbersize);
            }
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;    
            }   
        }     
    },
    save:function(){
        var confirm=window.confirm("是否下载")
        if (confirm) { 
            location.assign(this.canvas.toDataURL());
            location.href=this.canvas.toDataURL().replace("image/png","stream/octet");
        };       
        this.history=[];
        this.cobj.clearRect(0,0,this.canvasW,this.canvasH)
    }
};