function AnswerCheck(form) {
  try {
    $(form).find('button[type=submit]').prop('disabled', true);

    let send_text = $(form).find("input[type=text]").val().trim();
    if (send_text.length === 0) {
      $(form).find('.result').text("入力してください");
      $(form).find('button[type=submit]').prop('disabled', false);
      return false;
    }

    $.ajax({
      url: "./answer/" + form.name + "-ANSWER.txt",
      type: "GET",
      dataType: "json",
      timeout: 3000,
    })
    .done(function(resp) {
      let match = null;

      if (Array.isArray(resp)) {
        for (let item of resp) {
          let ans = item.answer;
          let ok = Array.isArray(ans) ? ans.includes(send_text) : (send_text === ans);
          if (ok) {
            match = item;
            break;
          }
        }
      } else {
        let ans = resp.answer;
        let ok = Array.isArray(ans) ? ans.includes(send_text) : (send_text === ans);
        if (ok) match = resp;
      }

      if (!match) {
        $(form).find(".result").text("「" + send_text + "」は不正解です。");
        return;
      }

      // 正解ポップアップ
      let imagePath = match.image || ("img/" + form.name + "_correct.png");
      showCorrectPopup(match.next, imagePath);

    })
    .fail(function() {
      $(form).find(".result").text("判定データがありません");
    })
    .always(function() {
      $(form).find('button[type=submit]').prop('disabled', false);
    });

  } catch (error) {
    console.error(error);
  }
}

function showCorrectPopup(nextPage, imagePath) {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popupImage");

  // ページロード時に常に非表示に
  popup.classList.add("hidden");
  popup.classList.remove("show");

  // 画像差し替え
  popupImage.src = imagePath;

  // ポップアップ表示
  setTimeout(() => {
    popup.classList.remove("hidden");
    popup.classList.add("show");
  }, 50); // 少し遅延させて強制リフレッシュ

  // 自動遷移（1.5秒後）
  setTimeout(() => {
    window.location.href = nextPage;
  }, 1500);

  // ブラウザバック対策
  history.replaceState(null, null, location.href);
}
