$(window).on('load', function () {
  const order = [2, 5, 3, 1, 4];
  const fadeMs = 1000;  // フェード時間
  const gapMs  = 10;  // 各画像間の待ち時間

  const showNext = (i) => {
    if (i < order.length) {
      const n = ('0' + order[i]).slice(-2);
      const sel = `.js-mv-img${n}`;
      $(sel).fadeIn(fadeMs, function () {
        setTimeout(() => showNext(i + 1), gapMs);
      });
    } else {
      // すべての画像が出たあとタイトルを表示
      $('.js-mv-title').fadeIn(800);
    }
  };

  showNext(0);
});