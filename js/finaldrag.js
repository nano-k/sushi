// ===============================
// 変数定義
// ===============================
let currentDrag = null; // 現在ドラッグ中の要素
let shiftX = 0;         // カーソルと要素左上の水平差
let shiftY = 0;         // カーソルと要素左上の垂直差

// ===============================
// カーソル（またはタッチ）の座標を取得
// ===============================
function getCursorPosition(event) {
  if (event.touches) { // スマホの場合
    return { x: event.touches[0].pageX, y: event.touches[0].pageY };
  }
  return { x: event.pageX, y: event.pageY }; // PC
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
  e.preventDefault(); // スクロールや選択を防止
  currentDrag = e.currentTarget;

  const cursor = getCursorPosition(e);
  const rect = currentDrag.getBoundingClientRect();

  // カーソルと要素の左上の差を保持（ドラッグ中にズレないように）
  shiftX = cursor.x - rect.left;
  shiftY = cursor.y - rect.top;

  // PC用イベント
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);
  // スマホ用イベント
  document.addEventListener("touchmove", dragging, { passive: false });
  document.addEventListener("touchend", dragEnd);
}

// ===============================
// ドラッグ中の処理
// ===============================
function dragging(e) {
  if (!currentDrag) return;
  e.preventDefault(); // スクロールやズーム防止

  const cursor = getCursorPosition(e);

  // ドラッグ要素の左上を更新
  currentDrag.style.left = cursor.x - shiftX + "px";
  currentDrag.style.top  = cursor.y - shiftY + "px";
}

// ===============================
// ドラッグ終了処理
// ===============================
function dragEnd() {
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);

  checkPlacement(); // 当たり判定
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
    const margin = 5; // 端ギリギリ防止の余白

    // 画像中央部分（60%）を当たり判定領域にする
    const hitWidth  = charRect.width * 0.6;
    const hitHeight = charRect.height * 0.6;

    const left   = charRect.left + (charRect.width - hitWidth)/2 - plateRect.left;
    const right  = left + hitWidth;
    const top    = charRect.top + (charRect.height - hitHeight)/2 - plateRect.top;
    const bottom = top + hitHeight;

    // 中央部分が皿内に収まっているか
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
// 初期配置（中央横並び）
// ===============================
window.addEventListener("load", () => {
  const wrapper = document.querySelector(".draggable-wrapper");
  const container = document.querySelector(".plate-container");

  // plate-container の中央に横並びで配置
  const rect = container.getBoundingClientRect();
  wrapper.style.position = "absolute";
  wrapper.style.left = rect.width / 2 + "px";
  wrapper.style.top  = rect.height / 2 + "px";
  wrapper.style.transform = "translate(-50%, -50%)";
});
