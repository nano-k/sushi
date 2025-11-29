function checkSelectAnswer() {
  const selA = document.getElementById("selectA").value;
  const selB = document.getElementById("selectB").value;
  const selC = document.getElementById("selectC").value;

  // 正解設定
  const correctA = "5";  // 5貫目
  const correctB = "あ"; // あ
  const correctC = "り"; // り

  const resultArea = document.getElementById("selectResult");

  if (selA === correctA && selB === correctB && selC === correctC) {
    window.location.href = "q9a.html";
  } else {
    resultArea.textContent = "何かが違うようだ…";
  }
}

// 画像タップで表示/非表示
document.addEventListener("DOMContentLoaded", () => {
  // 表示/非表示切り替え
  const toggleImg = document.getElementById("toggleImage");
  const toggleBtn = document.getElementById("toggleButton");

  if(toggleImg && toggleBtn){
    toggleBtn.addEventListener("click", () => {
      toggleImg.style.display = toggleImg.style.display === "none" ? "block" : "none";
    });
  }
});




// ブラウザバック時のポップアップ非表示
window.addEventListener("pageshow", function () {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.classList.remove("show");
    popup.classList.add("hidden");
  }
});

// 戻るトグル
$(document).ready(function() {
  $("#pastBtn").click(function(e) {
    e.preventDefault();
    $("#pastMenu").slideToggle(200);
  });
});
