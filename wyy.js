//初始化
function init(){
	song = musicData[id-1].song;
	album = musicData[id-1].album;
	singer = musicData[id-1].singer;
	source = musicData[id-1].source;
	url = musicData[id-1].url;
	cover = musicData[id-1].cover;
	lyric = musicData[id-1].lyric;
	love = musicData[id-1].love;
	msg = musicData[id-1].msg;
	$('.rightAside>h3').text(song);
	$('.rightUl').children().eq(0).children().eq(0).text(album);
	$('.rightUl').children().eq(1).children().eq(0).text(singer);
	$('.rightUl').children().eq(2).children().eq(0).text(source);
	$('audio').attr("src",url);
	$('#singer>img').attr("src",cover);
	for(var i=0;i<lrcs.length;i++){
		if(lrcs[i].song == lyric)	lrcss = lrcs[i];
	} 
	lyrics = lrcss.lyric;
	for(var i=0;i<2;i++){
		userId = msg[i].megId;
		var name = users[userId-1].name;
		$('.comDetail').eq(i).children().eq(0).text(name+"：");
		$('.comDetail').eq(i).children().eq(1).text(msg[i].megCon);
		$('.comDate').eq(i).text(msg[i].date);
	}
	$('#words').html("");
	for(var i=0;i<lyrics.length;i++){
		$('#words').append("<p>"+lyrics[i].lineLyric+"</p>");
		$('#words').children('p').eq(i).attr("time",lyrics[i].time);
	}
	addList();
	listChange();
	$('.songNum').children().eq(0).text($('.hisongs>li').length);
	$('.songNum2').children().eq(0).text($('.hisongs>li').length);
}
//添加历史歌单记录
function addList(){
	var lis = $('.hisongs>li');
	for(var i=0;i<lis.length;i++){
		if(lis.eq(i).text() == song+singer) 
		lis.eq(i).remove();
	}
	$('.hisongs').append("<li>"+song+"<em>"+singer+"</em></li>");
}
// 初始化歌单
function initSongs(){
	//把所有的歌曲添加到当前歌单
	for(var i=0;i<musicData.length;i++){
		$('.songs').append("<li>" + musicData[i].song + "<em>" + musicData[i].singer + "</em>" + "</li>");
	}
	//当前歌单有多少首
	$('.songNum').children().eq(0).text(musicData.length);
}
//正在播放的音乐改变歌单颜色
function listChange(){
	var lis = $('.songs>li');
	lis.css("color","#ddd");
	for(var i=0;i<lis.length;i++){
		if(lis.eq(i).text() == song+singer)
		lis.eq(i).css("color",skinColor);
	}
	var liss = $('.hisongs>li');
	liss.css("color","#ddd");
	for(var i=0;i<liss.length;i++){
		if(liss.eq(i).text() == song+singer)
		liss.eq(i).css("color",skinColor);
	}
}
// 改变主体颜色
function changeColor(){
	$('#container>nav').css("background-color",skinColor);
	$('.curWord').css("color",skinColor);
	$('footer').css("background-color",skinColor);
	$('#zhuomian').css("color",skinColor);
}
//绘制调色板
function drawcolorPicker(){
	var gradient = ctx.createLinearGradient(0,0,500,300);
	gradient.addColorStop(0,'rgb(255,255,255)');
	//向一个渐变添加一个颜色停止，是渐变过程中的位置，offset要是0~1之间
	gradient.addColorStop(0.2,'rgb(237,181,0)');
	gradient.addColorStop(0.4,'rgb(2,180,56)');
	gradient.addColorStop(0.6,'rgb(0,232,255)');
	gradient.addColorStop(0.8,'rgb(14,0,145)');
	gradient.addColorStop(1,'rgb(255,33,205)');
	ctx.fillStyle = gradient;//填充的颜色
	ctx.fillRect(0,0,500,300);//填充的范围
}
//添加评论到评论区
function addCom(inf){
	var html = '<div class="coms"><div class="comImg fl"></div><div class="comBox fl"><p class="comDetail"><em></em><span></span></p><span class="comDate comColor"></span><span class="fr comColor">👍点赞|分享|回复</span></div></div>'
	$('#comBody').append(html);
	var pict = $('.regis>img').attr("src");
	for(var i=0;i<users.length;i++){
		var user = users[i];
		var infImg = $('.comImg');
		var len = infImg.length;
		if(pict == user.pic){
			//渲染头像
			infImg.eq(len-1).css({
				"background":"url("+pict+")",
				"background-size":"100% 100%"
			});
			//渲染id
			$('.comDetail').eq(len-1).children().eq(0).text(user.name+"：");
			//渲染评论
			$('.comDetail').eq(len-1).children().eq(1).text(inf);
			//渲染时间
			var timer;
			var date = new Date();
			var y = date.getFullYear();
		    var m = date.getMonth()+1;
		    var d = date.getDate();
		    var h = date.getHours();
		    var mm = date.getMinutes();
		    var s = date.getSeconds();
			timer = y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
			$('.comDate').eq(len-1).text(timer);
		} 
	}
}
//获取评论区的头像
function getImg(){
	var imgs = $('.comImg');
	for(var j=0;j<imgs.length;j++){
		var name = $('.comDetail').eq(j).children().eq(0).text();
		name = name.slice(0,name.length-1);
		for(var i=0;i<users.length;i++){
			var user = users[i];
			if(name == user.name){
				pic = user.pic;
				$('.comImg').eq(j).css({
					"background":"url("+pic+")",
					"background-size":"100% 100%"
				});
			}
		}
	}
}
//工具函数：格式化秒数，转化成”时:分:秒“形式
function formatSeconds(s){
   var ss = parseInt(s);//去掉小数部分
   var hour = parseInt(ss/3600);//小时
   var minute =parseInt((ss % 3600)/60);//分钟
   ss = ss % 60;
   //当小时数为0时，不显示小时数
   //当秒是一位数，需要被前导0
   return `${hour>0?(hour+":"):""}${minute}:${ss>9?ss:('0'+ss)}`;
}
//左边歌手图片转动
function spin() {
	start = setInterval(function() {
		$('#singer').css("transform", "rotateZ(" + angle + "deg" + ")");
		angle += 0.2;
	}, 1);
}
//停止旋转
function noSpin(){
	clearInterval(start);
}
//播放和暂停
function zanting(){
	noSpin();
	audio.pause(); //暂停
	$('.pause').children(0).text("▲");
	$('.pause').children(0).css({
		"transform": "rotateZ(90deg)",
		"font-size": "1.6em",
		"margin-left": "8px",
		"margin-top": "8px"
	});
}
function bofang() {
	spin();
	audio.play(); //播放
	$('.pause').children(0).text("||");
	$('.pause').children(0).css({
		"transform": "rotateZ(0deg)",
		"font-size": "1.3em",
		"margin-left": "12px",
		"margin-top": "6px"
	});
}
//下一首
function nextSong() {
	if (id == 4) id = 1;
	else id++;
	init();
	audio.play();
	$('.pause').children(0).text("||");
	$('.pause').children(0).css({
		"transform": "rotateZ(0deg)",
		"font-size": "1.3em",
		"margin-left": "12px",
		"margin-top": "6px"
	});
}
//上一首
function lastSong() {
	if (id == 1) id = 4;
	else id--;
	init();
	audio.play();
	$('.pause').children(0).text("||");
	$('.pause').children(0).css({
		"transform": "rotateZ(0deg)",
		"font-size": "1.3em",
		"margin-left": "12px",
		"margin-top": "6px"
	});
}
