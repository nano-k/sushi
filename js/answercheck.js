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

      // -------------------------
      // ⭐ 分岐（配列形式）の場合
      // -------------------------
      if (Array.isArray(resp)) {
        for (let item of resp) {
          let ans = item.answer;
          let ok = Array.isArray(ans)
            ? ans.includes(send_text)
            : (send_text === ans);

          if (ok) {
            match = item; 
            break;
          }
        }
      } 
      // -------------------------
      // ⭐ 単体オブジェクト形式の場合
      // -------------------------
      else {
        let ans = resp.answer;
        let ok = Array.isArray(ans)
          ? ans.includes(send_text)
          : (send_text === ans);

        if (ok) match = resp;
      }

      // -------------------------
      // ❌ 不正解
      // -------------------------
      if (!match) {
        $(form).find(".result").text("「" + send_text + "」は不正解です。");
        return;
      }

      // -------------------------
      // ⭕ 正解 → ポップアップ表示
      // -------------------------
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

  popupImage.src = imagePath;

  popup.classList.remove("hidden");
  popup.classList.add("show");

  // タップで閉じて次へ
  popup.addEventListener("click", () => {
    window.location.href = nextPage;
  }, { once: true });

  // バックした時にポップアップを再表示しない
  history.replaceState(null, null, location.href);
}
