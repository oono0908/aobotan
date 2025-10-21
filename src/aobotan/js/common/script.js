// ハンバーガーメニュー
$(function () {
  let isOpen = false;

  // メニュー開閉
  function toggleMenu() {
    isOpen = !isOpen;
    $(".hamberger__line, .js-drawer").toggleClass("is-open", isOpen);
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
  $(document).on("click", function (e) {
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

  $title.on("click", function () {

    $title.not(this).removeClass("is-open");
    $title.not(this).next(".header-pc__nav-items").slideUp();

    $(this).toggleClass("is-open");
    $(this).next(".header-pc__nav-items").slideToggle();
  });
});
