var _audioNode = $(".u-audio");
var _audio = null;
var _audio_val = true;
var documentWidth = 640;
var isNext = true;
audio_init = function () {
    var options_audio = {
        loop: true,
        preload: "auto",
        src: _audioNode.attr("data-src")
    };
    _audio = new Audio();
    for (var key in options_audio) {
        if (options_audio.hasOwnProperty(key) && (key in _audio)) {
            _audio[key] = options_audio[key]
        }
    }
    _audio.load()
};
audio_addEvent = function () {
    if (_audioNode.length <= 0) {
        return
    }
    var txt = _audioNode.find(".txt_audio"),
        time_txt = null;
    _audioNode.find(".btn_audio").on("click", audio_contorl);
    $(_audio).on("play", function () {
        _audio_val = false;
        audio_txt(txt, true, time_txt)
    });
    $(_audio).on("pause", function () {
        audio_txt(txt, false, time_txt)
    });

    function audio_txt(txt, val, time_txt) {
        if (val) {
            txt.text("打开")
        } else {
            txt.text("关闭")
        }
        if (time_txt) {
            clearTimeout(time_txt)
        }
        txt.removeClass("z-move z-hide");
        time_txt = setTimeout(function () {
            txt.addClass("z-move").addClass("z-hide")
        }, 1000)
    }
};
audio_contorl = function () {
    if (!_audio_val) {
        audio_stop();
        $(".audio_open").removeClass("animated")
    } else {
        audio_play();
        $(".audio_open").addClass("animated")
    }
};
audio_play = function () {
    _audio_val = false;
    if (_audio) {
        _audio.play()
    }
};
audio_stop = function () {
    _audio_val = true;
    if (_audio) {
        _audio.pause()
    }
};

var Imgsrcs = ["./img/1.gif", "./img/tip.png", "./img/css_sprite.png", "./img/0.png", "./img/1.png", "./img/2.png", "./img/3.png", "./img/4.png", "./img/5.png", "./img/6.png", "./img/7.png", "./img/8.png", "./img/cloud.png", "./img/cloud2.png", "./img/cloud3.png", "./img/0a.jpg", "./img/0b.jpg", "./img/1a.jpg", "./img/1b.jpg", "./img/2a.jpg", "./img/2b.jpg", "./img/3a.jpg", "./img/3b.jpg", "./img/4a.jpg", "./img/4b.jpg", "./img/5a.jpg", "./img/5b.jpg", "./img/6a.jpg", "./img/6b.jpg", "./img/7a.jpg", "./img/7b.jpg"];
var imgSize = Imgsrcs.length;


var loadedPageNum = 0;
var pageFlag = [];
for (var i = 0; i < 8; i++) {

    pageFlag[i] = 0;

}


for (var i = 0; i < imgSize; i++) {
    (function (i) {
        var img = new Image();
        img.src = Imgsrcs[i];
        img.onload = function () {
            console.log("已经加载了" + (++loadedPageNum) + "张图片");

        }
    })(i)
}


function _touchstart(event) {
    startx = event.originalEvent.touches[0].pageX;
    starty = event.originalEvent.touches[0].pageY
}
function _touchmove(event) {
    event.preventDefault()
}
function _touchend(event) {
    endx = event.originalEvent.changedTouches[0].pageX;
    endy = event.originalEvent.changedTouches[0].pageY;
    var deltax = endx - startx;
    var deltay = endy - starty;
    if (Math.abs(deltax) < 0.1 * documentWidth && Math.abs(deltay) < 0.1 * documentWidth) {
        return
    }
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            console.log("向右");
            _pagePrev(event.data.page);


        } else {
            console.log("向左 " + event.data.page);
            _pageNext(event.data.page);
        }
    }
}


function _pageNext(page) {
    console.log(page + 1);
    $(".flipbook").turn("page", page + 1);

}

function _pagePrev(page) {
    console.log(page - 1);
    $(".flipbook").turn("page", page - 1);

}


$(document).ready(function () {
    console.log("document ready");
    $("#flower").css("margin-top", $(window).height() / 2 - 100 / 2);
    $("#flower").removeClass("f-hide");

});


$(window).on("load", function () {
    var winheight = $(window).height();
    // window.ontouchstart = function(e) {
    //     e.preventDefault();
    // };

    setTimeout(GameStart, 500);

    function GameStart() {


        $(".loading").fadeOut();
        $(".flipbook").removeClass("f-hide");

        $(".u-audio").removeClass("f-hide");
        audio_init();
        audio_addEvent();
        audio_contorl();
        audio_flag = false;
        $(window).on('touchend', function () {
            if (!audio_flag) {
                audio_play();
                audio_flag = true;
            }


        });
        BookInit();


    }

    function CloudIn() {
        $(".cloud").removeClass("f-hide");
        $("#cloud1").removeClass("f-hide");
        $("#cloud2").removeClass("f-hide");
        setTimeout(function () {

            $("#cloud1").css({
                "transform": "translateX(-40px)",
                "-webkit-transform": "translateX(-40px)"
            });
            $("#cloud2").css({
                "transform": "translateX(-640px)",
                "-webkit-transform": "translateX(-640px)"
            });

            $("#cloud1").addClass("flash1");
            $("#cloud2").addClass("flash1");


        }, 100);

    }

    function CloudOut() {
        $(".cloud").addClass("f-hide");
        $("#cloud1").addClass("f-hide");
        $("#cloud2").addClass("f-hide");
        $("#cloud1").css({
            "transform": "translateX(640px)",
            "-webkit-transform": "translateX(640px)"
        });
        $("#cloud2").css({
            "transform": "translateX(-1280px)",
            "-webkit-transform": "translateX(-1280px)"
        });
        $("#cloud1").removeClass("flash1");
        $("#cloud2").removeClass("flash1");
    }

    function CloudIn1($cloudc, $cloud) {
        $cloudc.removeClass("f-hide");
        // $cloud.addClass("flash");


    }

    function CloudOut1() {
        $(".cloudc").addClass("f-hide");
        // $(".cloud3").removeClass("flash");

    }


    function BookInit() {
        $(".flipbook").turn({
            acceleration: true,
            width: 640,
            height: winheight,
            duration: 800,
            elevation: 50,
            gradients: true,
            autoCenter: false,
            display: "single",
            inclination: 50,
            when: {
                turning: function (event, page, pageObj) {

                    console.log("the current turning page is" + page);
                    $(".page").removeClass("f-hide");
                    //if (page == 2) {
                    //
                    //    if (pageFlag[page - 1] == 0) {
                    //        pageFlag[page - 1] = 1;
                    //        $(".flipbook").turn("disable", true);
                    //        // setTimeout(CloudIn, 500);
                    //        //CloudIn1($(".cloudc"),$("cloud3"));
                    //
                    //        // $("#text2").removeClass("f-hide");
                    //        // $("#cloudc1").removeClass("f-hide");
                    //        //$("#text2").on("touchstart", initTip);
                    //
                    //        function initTip() {
                    //            console.log("page:" + page);
                    //            // CloudOut1($(".cloudc"),$("cloud3"));
                    //            //$("#cloudc1").addClass("f-hide");
                    //           // $("#text2").addClass("f-hide");
                    //            $("#mask" + page).eraser({
                    //                progressFunction: function (p) {
                    //                    console.log(Math.round(p * 100) + "%");
                    //                    if (p > 0.6) {
                    //
                    //                        $("#mask" + page).eraser("clear");
                    //                        setTimeout(function () {
                    //                            //CloudIn1($(".cloudc"),$("cloud3"));
                    //                            $("#cloudc1").removeClass("f-hide");
                    //                            $("#text3").removeClass("f-hide");
                    //                            $(".flipbook").turn("disable", false);
                    //                            // $("#text3").on("touchend", function() {
                    //
                    //                            //CloudOut1();
                    //                            //$("#text3").addClass("f-hide");
                    //                            //$(".flipbook").turn("peel", "br");
                    //                            setTimeout(function () {
                    //                                $("#tip" + (page - 1)).removeClass("f-hide");
                    //                                // $("#tip" + (page - 1)).on("touchend", function() {
                    //                                //     $("#tip").addClass("f-hide");
                    //                                // });
                    //                            }, 400);
                    //
                    //
                    //                            // });
                    //
                    //                        }, 500);
                    //
                    //
                    //                    }
                    //                }
                    //            });
                    //
                    //        }
                    //
                    //    }
                    //
                    //
                    //}
                    if (page >= 2) {

                        if (pageFlag[page - 1] == 0) {
                            pageFlag[page - 1] = 1;
                            $(".flipbook").turn("disable", true);
                            $("#mask" + page).eraser({
                                progressFunction: function (p) {
                                    console.log(Math.round(p * 100) + "%");
                                    if (p > 0.6) {

                                        $("#mask" + page).eraser("clear");
                                        setTimeout(function () {
                                            $("#cloudc" + (page - 1)).removeClass("f-hide");

                                            $("#text" + (page + 1)).removeClass("f-hide");
                                            $(".flipbook").turn("disable", false);


                                            if (page < 7) {
                                                $("#tip" + (page - 1)).removeClass("f-hide");
                                                // $("#tip").on("touchend", function() {
                                                //     $("#tip").addClass("f-hide");
                                                // });
                                                $("#tip" + (page - 1)).on("touchstart", _touchstart);
                                                $("#tip" + (page - 1)).on("touchmove", _touchmove);
                                                $("#tip" + (page - 1)).on("touchend", {page: page}, _touchend);

                                            } else {
                                                //最后一页
                                                setTimeout(function () {
                                                    $("#share").removeClass("f-hide");
                                                    $("#share").on("click", function () {
                                                        $("#share").addClass("f-hide");

                                                    });
                                                }, 5200);

                                            }


                                        }, 500);


                                    }
                                }
                            });

                        }
                    }

                },
                turned: function (event, page, pageObj) {
                    if (page == 1) {
                        if (pageFlag[page - 1] == 0) {
                            pageFlag[page - 1] = 1;
                            $(".flipbook").turn("disable", true);
                            setTimeout(function () {
                                $("#mask1").fadeOut(1000);
                                setTimeout(CloudIn, 1000);
                                setTimeout(function () {
                                    $("#text1").fadeIn();

                                    $("#text1").on("touchend", function () {
                                        $(".flipbook").turn("disable", false);
                                        $(".flipbook").turn("page", 2);
                                        CloudOut();
                                        $("#text1").addClass("f-hide");


                                    });
                                    $("#cloud2").on("touchend", function () {
                                        // $(".flipbook").turn("disable", false);
                                        CloudOut();
                                        $("#text1").addClass("f-hide");
                                        $(".flipbook").turn("page", 2);

                                    });
                                }, 3000);

                            }, 800);

                        }


                    }


                }
            }

        });
    }


});