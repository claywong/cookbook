/**
 * Created by yuki.yao on 2016/9/19.
 */
var localId = '';
var voice;
var recoding=false;
var music = document.getElementById('bgm'),$music = $('.music img');
var btnm =  document.getElementById('btnm');
var letm =  document.getElementById('letm');
var uploadVoiceId;

$(function() {
    if (window.navigator.userAgent.match(/MicroMessenger/i)) {
        console.log('111')
    }else{
        console.log('222')
    }
    hylink.trackPV("别克移动服务中心心声罐头-loading", "/loading");
    $(document).on('touchmove', function(e) {
        e.preventDefault();
    });
    queue = new createjs.LoadQueue();
    queue.on("progress", function(e) {
        var n = parseInt(e.loaded * 100);
        n = n < 9 ? "0" + n : n;
        n = n >= 100 ? 99 : n;
        $('.num').text(n + '%');

    }, queue);
    queue.on("complete", function() {
        $(".loading").fadeOut(500);
        hylink.trackPV("别克移动服务中心心声罐头-intro", "/intro");
        $('.main .page-1 .section-1 .text-1').addClass('text-1-move');
        $('.main .page-1 .section-1 .text-2').addClass('text-2-move');
        $('.main .page-1 .section-1 .text-3').addClass('text-3-move');
        var letterDelay = setTimeout(function() {
            $('.main .page-1 .section-1 .letter').show().addClass('animated tada');
            letm.play();
        }, 4500)

        $('.hotarea,.text1').click(function() {
            $('.hotarea').hide();
            $('.text1').fadeOut();
            $('.main>.tip,.city').fadeIn();
        });

    });

    var manifest = ['img/page-4/img4-bg.jpg', 'img/page-1/img1-bg.png', 'img/page-1/img1-word.png', 'img/page-2/img2-word-1.png', 'img/page-2/img2-word-2.png', 'img/page-5/img5-bg.jpg', 'img/page-5/img5-bg-1.jpg', 'img/page-5/img5-word.png', 'img/page-6/img6-bg.jpg', 'img/page-6/img6-bg-1.jpg', 'img/page-3/img3-okay.png', 'img/page-3/img3-okay-active.png', 'img/page-3/img3-tap-2.png', 'img/page-3/img3-tap-3.png'];
    queue.loadManifest(manifest);

    //音乐
    music.play();
    $music.on('click', function(event) {
        if (music.paused) {
            musicPlayPaue('play');
        } else {
            musicPlayPaue('pause');
        }
    });

    $('.main .page-1 .section-1 .letter').on('click', function() {
        hylink.trackPV("别克移动服务中心心声罐头-首页", "/homepage");
        hylink.trackEvent("别克移动服务中心心声罐头-intro-点击信封", "页面信封处", "点击", "点击信封");
        btnm.play();
        $('.section-1').fadeOut(500);
        $('.section-2').fadeIn(500);
        $('.main .page-1 .section-2 .text-1').addClass('text-1-move');
        $('.main .page-1 .section-2 .text-2').addClass('text-2-move');
        $('.main .page-1 .section-2 .text-3').addClass('text-3-move');
        $('.main .page-1 .section-2 .text-4').addClass('text-4-move');
        $('.main .page-1 .section-2 .text-5').addClass('text-5-move');
        $('.main .page-1 .section-2 .text-6').addClass('text-6-move');
        $('.main .page-1 .section-2 .text-7').addClass('text-7-move');
        $('.main .page-1 .section-2 .text-8').addClass('text-8-move');
        $('.main .page-1 .section-2 .text-9').addClass('text-9-move');
        $('.main .page-1 .section-2 .text-10').addClass('text-10-move');
        $('.main .page-1 .section-2 .btn').addClass('btn-move');
        var s2btnDelay = setTimeout(function() {
            $('.main .page-1 .section-2 .btn').fadeIn();
        }, 5000)

    });
    $('.main .page-1 .section-2 .btn').on('click', function() {
        hylink.trackPV("别克移动服务中心心声罐头-录音页", "/luyin");
        hylink.trackEvent("别克移动服务中心心声罐头-首页-去录制", "页面下方", "点击", "去录制");
        btnm.play();
        wx.startRecord({
            success: function(){
                localStorage.rainAllowRecord = 'true';
            },
            cancel: function () {
                alert('用户拒绝授权录音');
            }
        });
        $('.main .page-1 .section-2 .btn img').attr('src', 'img/page-2/img2-btn-active.png');
        $('.main .gh-logo img').attr('src', 'img/img-gh-logo-2.png');
        $('.main .page-1').fadeOut(500);
        $('.main .page-2 .section-3 .text-1').addClass('text-1-move');
        $('.main .page-2 .section-3 .text-2').addClass('text-3-move');
        $('.main .page-2 .section-3 .text-3').addClass('text-3-move');
        $('.main .page-2 .section-3 .text-4').addClass('text-4-move');
        $('.main .page-2 .section-3 .text-5').addClass('text-3-move');
        $('.main .page-2 .section-3 .text-6').addClass('text-6-move');
        $('.main .page-2 .section-3 .text-7').addClass('text-7-move');
        $('.main .page-2 .section-3 .text-8').addClass('text-7-move');
        $('.main .page-2 .section-3 .text-9').addClass('text-9-move');
        $('.main .page-2 .section-3 .text-10').addClass('text-2-move');
        $('.main .page-2 .section-3 .text-11').addClass('text-10-move');
        $('.main .page-2 .section-3 .text-12').addClass('text-2-move');
    });

    $('.main .page-2 .section-3 .tap').on('touchstart', function(e) {
        e.preventDefault();
        wx.stopRecord({
            success: function(res) {
                localId = res.localId;
                console.log(localId);
            }
        });
        if(recoding){
            stopRecoding();
            return;
        }
        recoding = true;
        musicPlayPaue('pause');
        $('.main .page-2 .section-3 .relisten img').attr('src','img/page-3/img3-listen.png');
        $('.main .page-2 .section-3 .tap').hide();
        $('.main .page-2 .section-3 .tap-active').show();
        $('.main .page-2 .section-3 .tap-bg').addClass('tap-move');
        var startRecordTimeout = setTimeout(function() {
            wx.startRecord();
        }, 300);

    });
    $('.main .page-2 .section-3 .tap').on('touchend', function(e) {
        e.preventDefault();
        stopRecoding();
        $('.main .page-2 .section-3 .relisten img').attr('src','img/page-3/img3-listen-active.png');
    });
    $('.main .page-2 .section-3 .relisten').on('click', function() {
        hylink.trackEvent("别克移动服务中心心声罐头-录音页-再听一遍", "页面右上方", "点击", "再听一遍");
        musicPlayPaue('pause');
        btnm.play();
        if (localId == '') {
            alert('请先录制一段声音');
            musicPlayPaue('play');
            return;
        }
        $('.main .page-2 .section-3 .relisten img').attr('src','img/page-3/img3-listen-active.png');
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
        wx.onVoicePlayEnd({
            serverId: localId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            success: function (res) {
                musicPlayPaue('play');
                $('.main .page-2 .section-3 .relisten img').attr('src','img/page-3/img3-listen.png');
            }
        });
    });
    $('.main .page-2 .section-3 .rerecord').on('click', function() {
        hylink.trackEvent("别克移动服务中心心声罐头-录音页-重录", "页面左上方", "点击", "重录");
        btnm.play();
        $('.main .page-2 .section-3 .relisten img').attr('src','img/page-3/img3-listen.png');
        $('.main .page-2 .section-3 .tap-bg').addClass('tap-move');
        $('.main .page-2 .section-3 .okay img').attr('src', 'img/page-3/img3-okay.png');

        wx.pauseVoice({
            localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
        localId = ''
    });
    $('.main .page-2 .section-3 .okay').on('click', function() {
        hylink.trackPV("别克移动服务中心心声罐头-录音成功页1", "/luyindone1");
        hylink.trackEvent("别克移动服务中心心声罐头-录音页-录好了生成", "页面下方", "点击", "录好了生成");
        btnm.play();
        if (localId == '') {
            alert('请先录制一段声音');
            return;
        }
        wx.pauseVoice({
            localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
        wx.uploadVoice({
            localId: localId,
            // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1,
            // 默认为1，显示进度提示
            success: function(res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                uploadVoiceId = serverId;
                $('.main .page-2').fadeOut(500);
                $('.main .page-3 .section-4 .text-1').addClass('text-1-move');
                $('.main .page-3 .section-4 .text-2').addClass('text-2-move');
                $('.main .page-3 .section-4 .text-3').addClass('text-3-move');
                $('.main .page-3 .section-4 .text-4').addClass('text-4-move');

            }
        });


    });


    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        noSwiping: true,
        speed: 800,
        onSlideChangeEnd: function(swiper) {
            hylink.trackPV("别克移动服务中心心声罐头-录音成功页2", "/luyindone2");
            $('.main .gh-logo img').attr('src', 'img/img-gh-logo-1.png');
            $('.main .page-3 .section-5 .text-1').addClass('text-1-move');
            $('.main .page-3 .section-5 .text-2').addClass('text-2-move');
            $('.main .page-3 .section-5 .text-3').addClass('text-3-move');
            $('.main .page-3 .section-5 .text-4').addClass('text-4-move');
            $('.main .page-3 .section-5 .text-5').addClass('text-5-move');
            $('.main .page-3 .section-5 .text-6').addClass('text-6-move');
            $('.main .page-3 .section-5 .text-7').addClass('text-7-move');
            $('.main .page-3 .section-5 .text-8').addClass('text-8-move');
            $('.main .page-3 .section-5 .text-9').addClass('text-9-move');
            $('.main .page-3 .section-5 .tin').addClass('tin-move');
            //var hadnDelay = setTimeout(function() {
            //    $('.main .page-3 .section-5 .hand').show().addClass('animated bounceIn');
            //}, 4500)
        }

    });
    //$('.main .page-3 .section-5 .tin').on('click', function() {
    //    hylink.trackEvent("别克移动服务中心心声罐头-录音成功页2-心声罐头", "页面中间", "点击", "心声罐头图片");
    //    btnm.play();
    //    $('.main .float,.main .mask').show();
    //
    //});
    //$('.main .float .close').on('click', function() {
    //    $('.main .float,.main .mask').hide();
    //
    //});

    $('.main .page-4 .section-6 .share').on('click', function() {
        hylink.trackPV("别克移动服务中心心声罐头-分享浮层", "/share");
        hylink.trackEvent("别克移动服务中心心声罐头-填写信息页-分享", "页面右上方", "点击", "分享给小伙伴");
        btnm.play();
        $('.main .share-tip,.main .mask').show();

    });
    $('.main .mask').on('click', function() {
        $('.main .share-tip,.main .mask').hide();

    });
    $('.main .page-3 .section-5 .btn').on('click', function() {
        hylink.trackPV("别克移动服务中心心声罐头-填写信息页", "/information");
        btnm.play();
        hylink.trackEvent("别克移动服务中心心声罐头-录音成功页2-填写收件信息", "页面下方", "点击", "填写收件信息");
        $('.main .page-4').fadeIn(500);

    });

    $('.main .page-4 .section-6 .submit').on('click', function() {
        hylink.trackEvent("别克移动服务中心心声罐头-填写信息页-提交", "页面左上方", "点击", "提交");
        btnm.play();
        var wait = false;
        if (wait) {
            reteurn;
        }

        $.post("media_get.ashx", {
            media_id: uploadVoiceId
        }, function(data) {
            console.log(data.result);
            voice = data.jsonResponse;
            if (data.result == 'success') {
                var submitData = {
                    dealer: '',
                    name: $('#name').val(),
                    mobile: $('#phone').val(),
                    address: $('#address').val(),
                    email: $('#email').val(),
                    voice: voice
                }
                if (submitData.name == '') {
                    alert("请选择输入姓名");
                    $('#name').focus();
                    return;
                }else if (!/1[345789]\d{9}/.test(submitData.mobile)) {
                    alert("手机号格式不正确");
                    $('#phone').focus();
                    return;
                }else if (submitData.address == '') {
                    alert("请填写地址");
                }else if (!/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(submitData.email)) {
                    alert("邮箱格式不正确");
                    return;
                }else if (submitData.province == '') {
                    alert("请选择省份");
                }else if (submitData.city == '') {
                    alert("请选择城市");
                }else {
                    wait = true;
                    $.get('submit.ashx', submitData, function(data) {
                        console.log(data)
                        if (data.result == 'success') {
                            hylink.trackPV("别克移动服务中心心声罐头-填写信息-提交成功浮层", "/information-succeed");
                            alert('提交成功');
                            $('#name').val('');
                            $('#phone').val('');
                            $('#address').val('');
                            $('#email').val('');
                        } else {
                            if(data.jsonResponse == 'mobile exist'){
                                alert('您的心声我们已经收到，还请耐心等待。');
                            }else{
                                alert('提交失败');
                            }
                        }
                        wait = false;
                    }, 'json');
                }
            } else {
                alert('上传失败！');
            }
        }, 'json');




    });



});

function stopRecoding(){
    recoding = false;
    musicPlayPaue('play');
    $('.main .page-2 .section-3 .okay img').attr('src', 'img/page-3/img3-okay-active.png');
    $('.main .page-2 .section-3 .tap').show();
    $('.main .page-2 .section-3 .tap-active').hide();
    $('.main .page-2 .section-3 .tap-bg').removeClass('tap-move');
    wx.stopRecord({
        success: function(res) {
            localId = res.localId;
            console.log(localId);
        }
    });
}

function musicPlayPaue(v) {
    if (v == 'play') {
        $(".music").addClass("rotate");
        music.play();
        $music.attr('src', 'img/icon-on.png');
    } else if (v == 'pause') {
        music.pause();
        $(".music").removeClass("rotate");
        $music.attr('src', 'img/icon-off.png');
    }
};
















