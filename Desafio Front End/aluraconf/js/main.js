scrollSmooth('a[href*=painel-sobre]');
scrollSmooth('a[href*=painel-palestrantes]');
scrollSmooth('a[href*=formulario]');

function scrollSmooth(seletor) {
  $(seletor).click(function (event) {
    event.preventDefault();
    var target = $(this).attr('href');
    $("html, body").animate({
      scrollTop: $(target).offset().top
    }, 700);
  });
}
