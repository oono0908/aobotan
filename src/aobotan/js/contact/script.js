$(document).ready(function () {
  const $submitBtn = $(".btn--submit");

  // バリデーション設定
  const validators = {
    inquiryType: {
      selector: 'input[name="inquiryType"]',
      validate: () => $('input[name="inquiryType"]:checked').length > 0,
      message: "お問い合わせの種類を選択してください",
      target: ".radio__list",
    },
    "name-family": {
      validate: (val) => val.trim() !== "" && val.trim().length <= 20,
      message: (val) =>
        val.trim() === ""
          ? "姓を入力してください"
          : "姓は20文字以内で入力してください",
    },
    "name-given": {
      validate: (val) => val.trim() !== "" && val.trim().length <= 20,
      message: (val) =>
        val.trim() === ""
          ? "名を入力してください"
          : "名は20文字以内で入力してください",
    },
    email: {
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return val.trim() !== "" && emailRegex.test(val.trim());
      },
      message: (val) =>
        val.trim() === ""
          ? "メールアドレスを入力してください"
          : "正しいメールアドレスを入力してください",
    },
    tel: {
      validate: (val) => {
        const telRegex = /^[0-9-]+$/;
        if (val.trim() === "" || !telRegex.test(val.trim())) return false;
        const telDigits = val.replace(/-/g, "");
        return telDigits.length >= 10 && telDigits.length <= 11;
      },
      message: (val) => {
        if (val.trim() === "") return "電話番号を入力してください";
        const telRegex = /^[0-9-]+$/;
        if (!telRegex.test(val.trim()))
          return "正しい電話番号を入力してください（数字とハイフンのみ）";
        const telDigits = val.replace(/-/g, "");
        return "電話番号は10〜11桁で入力してください";
      },
    },
    address: {
      validate: (val) => val.trim() !== "" && val.trim().length <= 100,
      message: (val) =>
        val.trim() === ""
          ? "住所を入力してください"
          : "住所は100文字以内で入力してください",
    },
    privacy: {
      validate: () => $("#privacy").is(":checked"),
      message: "プライバシーポリシーへの同意が必要です",
      target: ".form-group__checkbox-label",
    },
  };

  // エラーメッセージの表示/非表示
  function toggleError($element, message, show = true) {
    const $errorMsg = $element.siblings(".error-message");

    if (show && message) {
      if ($errorMsg.length === 0) {
        $element.after(`<div class="error-message">${message}</div>`);
      } else {
        $errorMsg.text(message);
      }
      $element.addClass("error");
    } else {
      $errorMsg.remove();
      $element.removeClass("error");
    }
  }

  // バリデーション実行
  function validateField(fieldId) {
    const validator = validators[fieldId];
    if (!validator) return true;

    let $element, value, isValid, message;

    if (fieldId === "inquiryType") {
      $element = $(validator.target);
      isValid = validator.validate();
      message = isValid ? null : validator.message;
    } else if (fieldId === "privacy") {
      $element = $(validator.target);
      isValid = validator.validate();
      message = isValid ? null : validator.message;
    } else {
      $element = $(`#${fieldId}`);
      value = $element.val();
      isValid = validator.validate(value);
      message = isValid ? null : validator.message(value);
    }

    toggleError($element, message, !isValid);
    return isValid;
  }

  // 全フィールドのバリデーション（送信ボタン制御用）
  function validateAllFields() {
    return Object.keys(validators).every((fieldId) => {
      const validator = validators[fieldId];
      if (!validator) return true;

      if (fieldId === "inquiryType") {
        return validator.validate();
      } else if (fieldId === "privacy") {
        return validator.validate();
      } else {
        const value = $(`#${fieldId}`).val();
        return validator.validate(value);
      }
    });
  }

  // 送信ボタンの状態制御
  function updateSubmitButton() {
    const allValid = validateAllFields();
    $submitBtn.prop("disabled", !allValid).toggleClass("disabled", !allValid);
  }

  // 初期化
  $submitBtn.prop("disabled", true).addClass("disabled");

  // イベントハンドラー
  $('input[name="inquiryType"]').on("change", () => {
    validateField("inquiryType");
    updateSubmitButton();
  });

  $("#privacy").on("change", () => {
    validateField("privacy");
    updateSubmitButton();
  });

  ["name-family", "name-given", "email", "tel", "address"].forEach(
    (fieldId) => {
      const $field = $(`#${fieldId}`);

      // blur時にバリデーションを実行してエラーを表示
      $field.on("blur", () => {
        validateField(fieldId);
        updateSubmitButton();
      });

      // input時は既にエラーが表示されている場合のみリアルタイムで検証
      $field.on("input", () => {
        if ($field.hasClass("error")) {
          validateField(fieldId);
        }
        updateSubmitButton();
      });
    }
  );
});
