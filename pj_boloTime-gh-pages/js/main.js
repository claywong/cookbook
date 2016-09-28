var $body = $("body");

$(".search__button").on('click', function() {
  $body.toggleClass('search-open').removeClass('menu-open');
});

$(".menu-collapse").on('click', function() {
  $body.toggleClass('menu-open').removeClass('search-open');
});

$(".nav__overlay").on('click', function() {
  $body.removeClass('menu-open').removeClass('search-open');
});
