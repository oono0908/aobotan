$(document).ready(function () {
  let $titleBtnItem = $(".js-title__btn-item");

  $titleBtnItem.on("click", function (e) {
    e.preventDefault();

    // クリックしたその要素のdata-targetを取得
    let target = $(this).data("target");
    if (target) {
      let targetElement = $(target);

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