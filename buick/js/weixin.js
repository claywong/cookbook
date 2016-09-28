var wl = window.location;
var pathUrl = 'http://'+wl.host+wl.pathname;
var wxdata = {};
var wximg = pathUrl+'img/wxshare.jpg';

wxdata = {
	signUrl : wl.href.split('#')[0],
	link : pathUrl,
	img :wximg,
	title : '心声罐头正式面世，保质期100天。',//分享给好友
	desc : '想知道，点我尝尝鲜。',//分享给好友
	timeLineTitle : '心声罐头正式面世，保质期100天。',//分享到朋友圈
	timeLineImg : wximg

}


$.post('http://www.buick.com.cn/weixinjssign/getbuicksign.aspx',{signurl:wxdata.signUrl},function(data){
	if (data.status == 0) {
		setWxConfig(data);
	} else {
		// 1为url为空，2为url中含有#，3为异常操作，4为签名失败
	}

},'json');




function setWxConfig(data){
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: data.appid, // 必填，公众号的唯一标识
		timestamp: data.timestamp, // 必填，生成签名的时间戳
		nonceStr:  data.nonceStr, // 必填，生成签名的随机串
		signature: data.signature, // 必填，签名，见附录1
		jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','uploadVoice','onVoicePlayEnd'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	setWxData();
};

function setWxData() {
	wx.ready(function(){
		wx.onMenuShareTimeline({
			title: wxdata.timeLineTitle, // 分享标题
			link: wxdata.link, // 分享链接
			imgUrl: wxdata.timeLineImg, // 分享图标
			success: function() {},
			cancel: function() {},
			trigger:function(){
				hylink.trackEvent("别克移动服务中心心声罐头-右上角分享","所有页面", "点击", "右上角分享");
			}
		});

		wx.onMenuShareAppMessage({
			title: wxdata.title, // 分享标题
			desc: wxdata.desc, // 分享描述
			link: wxdata.link, // 分享链接
			imgUrl: wxdata.img, // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {

			},
			cancel: function() {

			},
			trigger:function(){
				hylink.trackEvent("别克移动服务中心心声罐头-右上角分享","所有页面", "点击", "右上角分享");
			}
		});
	});



}










