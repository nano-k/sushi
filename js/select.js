function checkSelectAnswer() {
  const resultBox = document.getElementById("selectResult");

  // 各選択肢の値を取得
  const a = document.getElementById("selA").value;
  const b = document.getElementById("selB").value;
  const c = document.getElementById("selC").value;

  // 正解データ（JSONにしてもOK）
  const correct = {
    A: "5貫目",
    B: "あ",
    C: "り"
  };

  // 判定
  if (a === correct.A && b === correct.B && c === correct.C) {
    showQ9Popup("q10.html");   // 次ページへ
  } else {
    resultBox.textContent = "何かが違うようだ";
  }
}

function showQ9Popup(nextPage) {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
  popup.classList.add("show");

  setTimeout(() => {
    window.location.href = nextPage;
  }, 1500);
}

// ブラウザバック時のポップアップ非表示
window.addEventListener("pageshow", function () {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.classList.remove("show");
    popup.classList.add("hidden");
  }
});
