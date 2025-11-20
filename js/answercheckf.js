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

      // 正解ポップアップ表示＆遷移
      let imagePath = match.image || ("img/" + form.name + "_correct.png");
      let nextPage = match.next || "#";
      showCorrectPopup(nextPage, imagePath);

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

  // 画像差し替え
  popupImage.src = imagePath;

  // ポップアップ表示
  popup.classList.remove("hidden");
  popup.classList.add("show");

  // 1.5秒後に次ページへ遷移
  if(nextPage && nextPage !== "#"){
    setTimeout(() => {
      window.location.href = nextPage;
    }, 1500);
  }
}

// ブラウザバック対策：ページ復元時にポップアップ非表示
window.addEventListener("pageshow", function(event) {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.classList.remove("show");
    popup.classList.add("hidden");
  }
});
