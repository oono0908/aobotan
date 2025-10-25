$(document).ready(function () {
  $(".title__btn-item").on("click", function (e) {
    e.preventDefault();

    var target = $(this).data("target");

    if (target) {
      var targetElement = $(target);

      if (targetElement.length) {
        var targetOffset = targetElement.offset().top - 80;
        $("html, body").animate(

          {
            scrollTop: targetOffset,
          },
          800,
          "swing"
        ); 
      }
    }
  });
});
