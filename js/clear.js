// クリア報告（固定文言）
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("tweetBtn").addEventListener("click", function(e) {
    e.preventDefault();

    const text =
      "あなたは謎を解かないと帰れない寿司屋から脱出した。#寿司謎 #Web謎 @kotohano_nano\n" +
      "https://nano-k.github.io/sushi/";

    const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);

    window.open(url, "_blank", "noopener");
  });
});
