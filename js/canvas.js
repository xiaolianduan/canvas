var canvas=document.querySelector("canvas");
var rubberson=$(".rubber-son")[0]
var cobj=canvas.getContext("2d");
var shape=new Shape(canvas,cobj,rubberson);

// 切换形状
var lis=$(".shape li");
lis.click(function(){
	var index=$(this).index()
	shape.type=this.className;
	rubberson.style.display="none"
	$(".shape li").css({color:"white"}).eq(index-1).css({color:"red"});
	document.body.style.cursor="auto";
	if(index>=2){
		document.body.style.cursor="crosshair";	
	}
	if (index>4) {
		var num=prompt("请输入边数/角数","5");
		if (num<3) {
			alert("请至少输入3边/角以上")
			return;
		};	
		shape.side=num;				
	}			
	shape.draw()
})

// 切换功能
var starts=$(".start li")
starts.click(function () {
	shape[this.className]()
})


// 是否填充
var checkbox=$(".color")
checkbox.change(function () {
	if (this.checked) {
		shape.style="fill";
	}else{
		shape.style="stroke";
	}
})

// 切换样式
var types=$(".type li input")
types.change(function(){
	shape[this.className]=this.value;
})


// 切换背景颜色
var bgcolor=$(".bgcolor")
bgcolor.change(function () {
	document.body.style.background=this.value;
}) 

//橡皮
var rubbersize=$(".rubbersize")
rubbersize.change(function(){
	shape[this.className]=this.value;
	shape.rubber()
})


//阻止浏览器默认行为
var order=$(".order")[0];
order.onmousedown=function (e) {
    var ev=e||window.event;
    ev.preventDefault()
    order.onmousemove=function (e) {
        var ev=e||window.event;
        ev.preventDefault()
    }
	order.onmouseup=function (e) {
	    document.onmousemove=null;
	    document.onmouseup=null;
	}   
};

document.onkeydown=function(e){
	var ev=e||window.event
	if (ev.ctrlKey&&ev.keyCode==90) {
		shape.back()
	};
}