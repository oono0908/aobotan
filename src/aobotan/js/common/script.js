// ハンバーガーメニュー
$(function () {
  let isOpen = false;

  // メニュー開閉
  function toggleMenu() {
    isOpen = !isOpen;
    $(".js-hamberger__line, .js-drawer").toggleClass("is-open", isOpen);
    $("body").css("overflow", isOpen ? "hidden" : "");
  }

  // ハンバーガーボタンクリック
  $(".js-hamberger").on("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // リンククリックで閉じる
  $(".js-drawer__item").on("click", toggleMenu);

  // 外側クリックで閉じる
  $(".js-drawer").on("click", function (e) {
    if (isOpen && !$(e.target).closest(".js-drawer, .js-hamberger").length) {
      toggleMenu();
    }
  });

  // ESCキーで閉じる
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && isOpen) toggleMenu();
  });
});

// サイドバーナビの開閉
$(function () {
  let $title = $(".js-header-pc__nav-title-wrapper");
  $title.on("mouseenter", function (e) {
    e.stopPropagation();
    $(this).addClass("is-open");
    $(this).find(".js-header-pc__nav-items").slideDown();
  });
  $title.on("mouseleave", function (e) {
    e.stopPropagation();
    $(this).removeClass("is-open");
    $(this).find(".js-header-pc__nav-items").slideUp();
  });
});

// ヘッダーナビのリンククリック時、適切なページに遷移してスクロール
$(function () {
  // pc版のheaderリンククリック時
  let $navItem = $(".js-header-pc__nav-item").find("a");
  // ドロワーのリンククリック時
  let $drawerItem = $(".drawer__item").find("a");
  // フッターのリンククリック時
  let $footerItem = $(".footer-nav__item").find("a");
  // 現在のURLを取得
  let currentHref = window.location.href;

  $navItem.add($drawerItem).add($footerItem).on("click", function (e) {
    e.preventDefault();

    let href = $(this).attr("href");
    let dataHref = $(this).attr("data-href");

    if (dataHref === "#about") {
      window.location.href = "/aobotan/about/index.html" + href;

    } else if (dataHref === "#service") {
      window.location.href = "/aobotan/service/index.html" + href;

    } else if (dataHref === "#news") {
      // トップページの時と下層ページの時で遷移先を変える
      if (currentHref.includes("about") || currentHref.includes("service") || currentHref.includes("contact")) {
        window.location.href = "/aobotan/index.html" + href;

      } else {
        window.location.href = "/aobotan/index.html" + href;

      }
    } else if (dataHref === "#contact") {
      window.location.href = "/aobotan/contact/index.html";

    } else if (dataHref === "#top") {
      window.location.href = "/aobotan/index.html";
    }
  });
});

window.onload = function () {
  let id = window.location.hash;
  let idName = id.replace("#", "");
  let windowWidth = $(window).width();

  if (idName) {
    let className = $("." + idName);
    if (className.length) {
      // 画面幅によってスクロール位置を調整
      let scrollOffset = windowWidth > 768 ? 60 : 120;

      let scrollPosition = className.offset().top - scrollOffset;

      $("html, body").animate({ scrollTop: scrollPosition }, 600);
    }
  }

  history.replaceState(
    null,
    null,
    window.location.pathname + window.location.search
  );
};


// ページ内アンカーリンクのスムーズスクロール
$(function () {
  // pc版のheaderリンククリック時
  let $navItem = $(".js-header-pc__nav-item").find("a");
  // ドロワーのリンククリック時
  let $drawerItem = $(".drawer__item").find("a");

  $navItem.add($drawerItem).on("click", function (e) {
    let href = $(this).attr("href");
    let $target = href.replace("#", "");
    if ($target.length) {
      e.preventDefault();
      let className = $("." + $target);
      let targetOffset = className.offset().top - 60;
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

// スクロール時にヘッダーの背景色を変える
$(function() {
  $(window).on('scroll', function() {
    let aboutTop = $('.js-scroll-top').offset().top;
    let scroll = $(window).scrollTop();

    if (scroll >= aboutTop) {
      $('.js-header-sp').css('background-color', "#ffffff");
    } else {
      $('.js-header-sp').css('background-color', 'transparent');
    }
  });
});