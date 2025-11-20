// ===============================
// 変数定義
// ===============================
let currentDrag = null; // 現在ドラッグ中の要素

// ===============================
// カーソル（またはタッチ）の座標取得
// ===============================
function getCursorPosition(event) {
  if (event.touches) {
    return { x: event.touches[0].pageX, y: event.touches[0].pageY };
  }
  return { x: event.pageX, y: event.pageY };
}

// ===============================
// ドラッグ開始イベントを初期化（PC + スマホ共通）
// ===============================
document.querySelectorAll(".draggable").forEach(elem => {
  elem.addEventListener("mousedown", dragStart); // PC
  elem.addEventListener("touchstart", dragStart, { passive: false }); // スマホ
});

// ===============================
// ドラッグ開始処理
// ===============================
function dragStart(e) {
  e.preventDefault();

  // 現在ドラッグ中の要素にセット
  currentDrag = e.currentTarget;

  // ズレなしで左上基準で動かす
  // クリック位置に関係なく動かせる
  currentDrag.style.position = "absolute";

  // ドラッグ中のイベント登録
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("touchmove", dragging, { passive: false });
  document.addEventListener("touchend", dragEnd);
}

// ===============================
// ドラッグ中の処理
// ===============================
function dragging(e) {
  if (!currentDrag) return;
  e.preventDefault();

  const cursor = getCursorPosition(e);

  // 左上に要素を合わせる（ドラッグしていないと動かせない仕様）
  currentDrag.style.left = cursor.x + "px";
  currentDrag.style.top  = cursor.y + "px";
}

// ===============================
// ドラッグ終了処理
// ===============================
function dragEnd() {
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);

  checkPlacement(); // 皿判定
  currentDrag = null;
}

// ===============================
// 厳しめ判定：画像中央部分のみを判定
// ===============================
function checkPlacement() {
  const plate = document.querySelector('.plate');
  const plateRect = plate.getBoundingClientRect();

  const charA = document.getElementById('charA').getBoundingClientRect();
  const charG = document.getElementById('charG').getBoundingClientRect();

  function isOnPlate(charRect) {
    const margin = 5; // 端ギリギリ防止
    const hitWidth = charRect.width * 0.6;  // 中央60%
    const hitHeight = charRect.height * 0.6;

    const left   = charRect.left + (charRect.width - hitWidth)/2 - plateRect.left;
    const right  = left + hitWidth;
    const top    = charRect.top + (charRect.height - hitHeight)/2 - plateRect.top;
    const bottom = top + hitHeight;

    return left >= margin &&
           right <= plateRect.width - margin &&
           top >= margin &&
           bottom <= plateRect.height - margin;
  }

  if (isOnPlate(charA) && isOnPlate(charG)) {
    document.querySelector('.result').textContent = "クリア！ あ + がり = あがり";
  } else {
    document.querySelector('.result').textContent = "";
  }
}

// ===============================
// 初期配置（皿中央に横並び）
// ===============================
window.addEventListener("load", () => {
  const wrapper = document.querySelector(".draggable-wrapper");
  const container = document.querySelector(".plate-container");

  const rect = container.getBoundingClientRect();
  wrapper.style.position = "absolute";
  wrapper.style.left = rect.width / 2 + "px";
  wrapper.style.top  = rect.height / 2 + "px";
  wrapper.style.transform = "translate(-50%, -50%)";
});
