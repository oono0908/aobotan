// mvセクションの画像の表示
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

// aboutセクションのswiper
$(function () {
  var swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 8000,
    allowTouchMove: false,
    freeMode: true,
    freeModeMomentum: false,
    loopAdditionalSlides: 10,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    },

    // 👇 画面幅ごとの spaceBetween 設定
    breakpoints: {
      0: { // スマホ（〜767px）
        spaceBetween: 19
      },
      768: { // タブレット以上
        spaceBetween: 48
      }
    }
  });

  // 念のためクリックやホバーで停止しないように
  $('.swiper').on('click mousedown mouseup focus mouseenter mouseleave', function () {
    // 何もしない
  });
});

// mvの中の画像がマウスの動きに応じて動く
$(function() {
  const $inner = $('.mv__inner');
  const $imgs = $inner.find('.mv__img-wrapper');
  const moveAmount = 30; // 動く範囲（px）

  $inner.on('mousemove', function(e) {
    const x = e.pageX - $inner.offset().left;
    const y = e.pageY - $inner.offset().top;
    const w = $inner.width();
    const h = $inner.height();
    const moveX = (x / w - 0.5) * moveAmount;
    const moveY = (y / h - 0.5) * moveAmount;

    $imgs.each(function(i) {
      const depth = (i + 1) / $imgs.length; // 画像ごとに動きの強さを変える
      $(this).css('transform', `translate(${moveX * depth}px, ${moveY * depth}px)`);
    });
  });

  $inner.on('mouseleave', function() {
    $imgs.css('transform', 'translate(0, 0)');
  });
});
