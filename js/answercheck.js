function AnswerCheck(form) {
  try {
    $(form).find('button[type=submit]').prop('disabled', true);

    // 入力値を取得して前後のスペースを削除
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
      let ans = resp.answer;      // 正解文字列 or 配列
      let nextPage = resp.next;   // 遷移先

      let isCorrect = false;

      if (Array.isArray(ans)) {
        isCorrect = ans.includes(send_text);  // 完全一致
      } else {
        isCorrect = (send_text === ans);
      }

      if (isCorrect) {
        showCorrectPopup(nextPage);   // 正解ポップアップ表示
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
