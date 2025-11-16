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
      let ans = resp.answer;
      let nextPage = resp.next;
      let imagePath = resp.image || ("img/" + form.name + "_correct.png"); 
      // ↑ image が無いなら従来の固定画像にフォールバック

      let isCorrect = Array.isArray(ans)
        ? ans.includes(send_text)
        : (send_text === ans);

      if (isCorrect) {
        showCorrectPopup(nextPage, imagePath);
      } else {
        $(form).find(".result").text("「" + send_text + "」は不正解です。");
      }
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

  // タップで閉じる＋次ページへ
  popup.addEventListener("click", () => {
    window.location.href = nextPage;
  }, { once: true });

  // バックした時に表示されないように
  history.replaceState(null, null, location.href);
}
