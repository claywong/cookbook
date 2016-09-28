var localId = '';
var voice;
var recoding = false;
var music = document.getElementById('bgm'), $music = $('.music img');
var btnm = document.getElementById('btnm');
var letm = document.getElementById('letm');
var uploadVoiceId;

$(function () {
    if (window.navigator.userAgent.match(/MicroMessager/i)) {
        console.log('micromessage');
    } else {
        console.log('other userAgent');
    }

    $(document).on('touchmove', function (e) {
        e.preventDefault();
    });


    queue = new createjs.LoadQueue();
    queue.on("progress", function (e) {
        var n = parseInt(e.loaded * 100);
        n = n < 9 ? "0" + n : n;
        n = n >= 100 ? 99 : n;
        $('.num').text(n + '%');
    }, queue);
    queue.on("complete", function () {
        $('.loading').fadeOut(500);
        var letterDelay = setTimeout(function () {
            $('.main .page1 .section-1 .letter').show().addClass('animated tada');
            letm.play();
        }, 4500)
    });
    var manifest = ['img/img-logo.png'];
    queue.loadManifest(manifest);

    music.play();
    $music.on("click", function (event) {
        if (music.paused) {
            musicPlayPaue('play');
        } else {
            musicPlayPaue('pause');
        }
        
    })

});


function musicPlayPaue(v) {
    if (v == 'play') {
        $('.music').addClass("rotate");
        music.play();
        $music.attr('src', 'img/icon-on.png');
    } else if (v == 'pause') {
        music.pause();
        $(".music").removeClass("rotate");
        $music.attr('src', 'img/icon-off.png');
    }

}