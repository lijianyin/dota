//微信显示，隐藏
$(".erwm p").on("mouseenter",function (){
	$(".erwm img").slideDown(300);
});
$(".erwm p").on("mouseleave",function (){
	$(".erwm img").slideUp(10);
});
$(document).on("scroll",function (){
	var nowtop=$("body").scrollTop();
	if(nowtop>=90){
		$(".erwm p").css({position:"fixed",right:"94px",top:0,zIndex:9999});
	}
	else{
		$(".erwm p").css({position:"relative",right:0})
	}
});

//导航效果
$(".list").on("mouseenter","li",function (){
	$(this).css("background","#D9F9F4").css("color","#000");
	$(this).children(".text").slideDown(500);
});
$(".nav").on("mouseleave","li",function (){
	$(this).css("background","#141517").css("color","#888");
	$(this).children(".text").slideUp(200);
});

//清除空白节点
Element.prototype.cnn=function(){
	var thisChild=this.childNodes;
	for(var i=0;i<thisChild.length;i++){ 
		if(thisChild[i].nodeType==3 && !/\S/.test(thisChild[i].nodeValue)){
			this.removeChild(thisChild[i]);
		}
	}
}
function CNN(){
	var alldom=document.getElementsByTagName('*');
	for(var i=0;i<alldom.length;i++){
		alldom[i].cnn();    
		
	}
}
CNN();

//获取指定属性下的元素集合
function getClass(classname){
	var alldom=document.getElementsByTagName('*');
	var _arr=[];
	for(var i=0;i<alldom.length;i++){
		if(alldom[i].hasAttribute("class")){
			var cn= " "+alldom[i].getAttribute("class")+" ";
			var myreg=new RegExp(" "+classname+" "); //正则表达式
			if(myreg.test(cn)){
				_arr.push(alldom[i]);
			}
		}
	}
	return _arr;
}

//判断一个元素是否有指定样式
Element.prototype.hasClass=function(cname){
	if(this.hasAttribute("class")){
		var reg=new RegExp(" "+cname+" ");
		var thisclass=" "+this.getAttribute("class")+" ";
		if(reg.test(thisclass)){
			return true;
		}

	}
	return false;
}

//给一个元素添加一个样式
Element.prototype.addClass=function (_newclass){
	if(!this.hasClass(_newclass)){
		this.setAttribute("class",this.getAttribute("class")+" "+_newclass);
	}
}

//给一个元素删除一个样式
Element.prototype.delClass=function (_delclass){
	if(this.hasClass(_delclass)){
		var thisClass=" "+this.getAttribute("class")+" ";
		var myreg=new RegExp(" "+_delclass+" ","igm");
		while(myreg.test(thisClass)){
			thisClass=thisClass.replace(myreg," ");
		}
		this.setAttribute("class",thisClass.trim());
	}
}

//获取一个指定元素的索引值
Element.prototype.index=function(){
	var thisSib=this.parentNode.childNodes;
	for(var i=0;i<thisSib.length;i++){
		if(thisSib[i]==this){
			return i;
		}
	}
}

//DOM2事件绑定兼容性
Element.prototype.addHandler=function (etype,func){
	if(this.addEventListener){
		this.addEventListener(etype,func,false);
	}
	else{
		this.attachEvent("on"+etype,func);
	}
}

//banner轮播图
var $pic=getClass("pic")[0];
var $ul=getClass("myul")[0];
var $con=getClass("con")[0];
var picchild=$pic.childNodes;
var ulchild=$ul.childNodes;
var oldindex=0;
var timer=setInterval(zdlunbo,2000);
var outtime;
ulchild[0].setAttribute("class","act");
picchild[0].style.opacity="1";
$con.innerHTML="Dota全家福";
$ul.addHandler("mouseover",function (e){
	var e=e||window.event;
	var target=e.target||e.srcElement;
	if(target.tagName="LI"){
		outtime=setTimeout(function (){
			showfocus(oldindex,target.index());
		},500)
		clearInterval(timer);
	}
});
$ul.addHandler("mouseout",function (e){
	var e=e||window.event;
	var target=e.target||e.srcElement;
	if(target.tagName="LI"){
		timer=setInterval(zdlunbo,2000);
		clearInterval(outtime);
	}
});
function showfocus(_old,_new){
	if(_old!=_new){
		oldindex=_new;
		picchild[_old].style.opacity="1";
		var t1=setInterval(function (){
			var oldOc=picchild[_old].style.opacity;
			if(oldOc<0.1){
				clearInterval(t1);
				picchild[_old].style.opacity="0";
			}
			else{
				picchild[_old].style.opacity=picchild[_old].style.opacity/2;
			}
		},24);
		picchild[_new].style.opacity="0";
		var t2=setInterval(function (){
			var newOc=picchild[_new].style.opacity;
			if(newOc>0.9){
				clearInterval(t2);
				picchild[_new].style.opacity="1";
			}else{
				picchild[_new].style.opacity=(1+Number(picchild[_new].style.opacity))/2;
			}
		},24)
		ulchild[_old].delClass("act");
		ulchild[_new].addClass("act");
		$con.innerHTML=picchild[_new].getAttribute("alt");
	}	
}
function zdlunbo(){
	var newindex;
	if(oldindex<ulchild.length-1){
		newindex=oldindex+1;
	}else{
		newindex=0;
	}
	showfocus(oldindex,newindex);
}

//选项卡
//第一个:点击效果,封装函数
var $ul01=getClass("myul01");
var $con01=getClass("con01");
function mytab(tab){
	var $ulchild=tab.tabul.childNodes;
	var $conchild=tab.tabcon.childNodes;
	if(tab.tabeve==undefined){
		tab.tabeve="mouseover";
	}
	if(tab.tabact==undefined){
		tab.tabact="act";
	}
	$ulchild[0].addClass(tab.tabact);
	tab.tabul.addHandler(tab.tabeve,function (e){
		var e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName=="LI"){
			showtab(target.index());
		}
	});
	function showtab(_now){
		for(var i=0;i<$ulchild.length;i++){
			if(i==_now){
				$ulchild[_now].addClass(tab.tabact);
				$conchild[_now].delClass("none");
			}else{
				$ulchild[i].delClass(tab.tabact);
				$conchild[i].addClass("none");
			}
		}
	}
}
var tab={
	tabul:$ul01[0],
	tabcon:$con01[0],
	tabeve:"click",
	tabact:"act01"
};
mytab(tab);

//第二个:点击效果,封装对象
var $ul02=getClass("myul02");
var $con02=getClass("con02");
Element.prototype.mytab=function (tab){
	var $ulchild=this.childNodes;
	var $conchild=tab.tabcon.childNodes;
	$ulchild[0].addClass(tab.tabact);
	if(tab.tabeve==undefined){
		tab.tabeve="mouseover";
	}
	if(tab.tabact==undefined){
		tab.tabact="act";
	}
	this.addHandler(tab.tabeve,function (e){
		var e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName=="LI"){
			showtab(target.index());
		}
	});
	function showtab(_now){
		for(var i=0;i<$ulchild.length;i++){
			if(i==_now){
				$ulchild[_now].addClass(tab.tabact);
				$conchild[_now].delClass("none");
			}else{
				$ulchild[i].delClass(tab.tabact);
				$conchild[i].addClass("none");
			}
		}
	}
}
var tab={
	tabul:$ul02[0],
	tabcon:$con02[0],
	tabeve:"click",
	tabact:"act02"
};
$ul02[0].mytab(tab);

//第三个:鼠标经过效果,封装函数
var $ul03=getClass("myul03");
var $con03=getClass("con03");
function mytab(tab){
	var $ulchild=tab.tabul.childNodes;
	var $conchild=tab.tabcon.childNodes;
	if(tab.tabeve==undefined){
		tab.tabeve="mouseover";
	}
	if(tab.tabact==undefined){
		tab.tabact="act";
	}
	$ulchild[0].addClass(tab.tabact);
	tab.tabul.addHandler(tab.tabeve,function (e){
		var e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName=="LI"){
			showtab(target.index());
		}
	});
	function showtab(_now){
		for(var i=0;i<$ulchild.length;i++){
			if(i==_now){
				$ulchild[_now].addClass(tab.tabact);
				$conchild[_now].delClass("none");
			}else{
				$ulchild[i].delClass(tab.tabact);
				$conchild[i].addClass("none");
			}
		}
	}
}
var tab={
	tabul:$ul03[0],
	tabcon:$con03[0],
	tabact:"act03"
};
mytab(tab);

//第四个:经过效果,封装对象
var $ul04=getClass("myul04");
var $con04=getClass("con04");
Element.prototype.mytab=function (tab){
	var $ulchild=this.childNodes;
	var $conchild=tab.tabcon.childNodes;
	$ulchild[0].addClass(tab.tabact);
	if(tab.tabeve==undefined){
		tab.tabeve="mouseover";
	}
	if(tab.tabact==undefined){
		tab.tabact="act";
	}
	this.addHandler(tab.tabeve,function (e){
		var e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName=="LI"){
			showtab(target.index());
		}
	});
	function showtab(_now){
		for(var i=0;i<$ulchild.length;i++){
			if(i==_now){
				$ulchild[_now].addClass(tab.tabact);
				$conchild[_now].delClass("none");
			}else{
				$ulchild[i].delClass(tab.tabact);
				$conchild[i].addClass("none");
			}
		}
	}
}
var tab={
	tabul:$ul04[0],
	tabcon:$con04[0],
	tabact:"act04"
};
$ul04[0].mytab(tab);

//评星效果
var $ul_px=getClass("ul-px");
Element.prototype.mypx=function (tab){
	var $allLi=this.childNodes;
	if(tab.tabeve==undefined){
		tab.tabeve="mouseover";
	}
	if(tab.tabact==undefined){
		tab.tabact="act";
	}
	this.addHandler(tab.tabeve,function (e){
		var e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName=="LI"){
			showtab(target.index());
		}
	});
	function showtab(_now){
		for(var i=0;i<$allLi.length;i++){
			if(i<=_now){
				for(var j=0;j<=_now;j++){
					($allLi[j].childNodes)[0].addClass(tab.tabnone);
					($allLi[j].childNodes)[1].delClass(tab.tabact);
				}
			}else{
				($allLi[i].childNodes)[0].delClass(tab.tabnone);
				($allLi[i].childNodes)[1].addClass(tab.tabact);
			}
		}
	}
}
var tab={
	tabul:$ul_px[0],
	tabact:"img02",
	tabnone:"none",
	tabeve:"mouseover"
};
$ul_px[0].mypx(tab);

var $btn=getClass("btn")[0];
var $allli=$ul_px[0].childNodes;
$btn.onclick=function (){
	for(var i=0;i<$allli.length;i++){
		($allli[i].childNodes)[0].delClass("none");
		($allli[i].childNodes)[1].addClass("img02");
	}
}

//相关推荐
var $ul_tj=getClass("ul-tj");
Element.prototype.mytj=function (tab){
	var $allLi=this.childNodes;
	if(tab.tabeve==undefined){
		tab.tabeve="mouseover";
	}
	if(tab.tabact==undefined){
		tab.tabact="act";
	}
	this.addHandler(tab.tabeve,function (e){
		var e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName=="LI"){
			showtab();
		}
	});
	function showtab(){
		for(var i=0;i<$allLi.length;i++){
			$allLi[i].style.backgroundColor=rcolor(16);
			$allLi[i].firstChild.style.color=rcolor(16);
		}
	}
	function rdm(max,rt){
		var rd=Math.round(Math.random()*(max-1)+1);
		if(rt==undefined){
			return rd;
		}else{
			return rd+rt;
		}		
	}
	function rcolor(jz){
		var str="";
		var k1,k2,k3;
		if(jz==10){
			str="rgb("+rdm(255)+","+rdm(255)+","+rdm(255)+")";
		}else{
			var k1=rdm(255);
			var	k2=rdm(255);
			var k3=rdm(255);
			if(k1<16){
				k1="0"+k1.toString(16);
			}else{
				k1=k1.toString(16);
			}
			if(k2<16){
				k2="0"+k2.toString(16);
			}else{
				k2=k2.toString(16);
			}
			if(k3<16){
				k3="0"+k3.toString(16);
			}else{
				k3=k3.toString(16);
			}
			str="#"+k1+k2+k3;
		}
		return str;
	}
}
var tab={
	tabul:$ul_tj[0],
};
$ul_tj[0].mytj(tab);

//点击返回顶部
$(".tBtn").on("click",function (){
	$("body,html").animate({
		scrollTop:0
	},"slow")
});
$(document).on("scroll",function (){
	var nowtop=$("body").scrollTop();
	if(nowtop>=500){
		$(".tBtn").show();
	}else{
		$(".tBtn").hide();
	}
});