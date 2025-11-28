// 全ヒントのタイトルを取得
const titles = document.querySelectorAll(".hint-title");

titles.forEach(title => {
  title.addEventListener("click", () => {
    const content = title.nextElementSibling;

    // 開閉切り替え
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
