// ページ読み込み時にURLのハッシュをチェックしてスクロール
$(window).on("load", function () {
  const hash = window.location.hash;
  if (hash) {
    const $target = $(hash);
    if ($target.length) {
      setTimeout(function () {
        const targetOffset = $target.offset().top;
        $("html, body").animate(
          {
            scrollTop: targetOffset,
          },
          800,
          "swing"
        );
      }, 100);
    }
  }
});

// ページ内のアンカーリンク用のスムーズスクロール
$(function () {
  $("a[href^='#']").on("click", function (e) {
    const href = $(this).attr("href");
    const $target = $(href);

    if ($target.length) {
      e.preventDefault();
      const targetOffset = $target.offset().top;
      $("html, body").animate(
        {
          scrollTop: targetOffset,
        },
        800,
        "swing"
      );
    }
  });
});
