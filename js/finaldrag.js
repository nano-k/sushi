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
  // PCの場合
  return { x: event.pageX, y: event.pageY };
}

// ===============================
// ドラッグ開始イベントを設定
// ===============================
document.querySelectorAll(".draggable").forEach(elem => {
  // PC用
  elem.addEventListener("mousedown", dragStart);
  // スマホ用 (passive: false で preventDefault が有効)
  elem.addEventListener("touchstart", dragStart, { passive: false });
});

// ===============================
// ドラッグ開始処理
// ===============================
function dragStart(e) {
  e.preventDefault(); // スクロールや選択を防止

  currentDrag = e.currentTarget; // 今ドラッグしている要素
  const cursor = getCursorPosition(e); // カーソル/タッチ位置取得
  const rect = currentDrag.getBoundingClientRect(); // 要素の位置とサイズ

  // カーソルと要素の左上の差を保存（ドラッグ中にズレないように）
  shiftX = cursor.x - rect.left;
  shiftY = cursor.y - rect.top;

  // PC用ドラッグイベント
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);

  // スマホ用ドラッグイベント
  document.addEventListener("touchmove", dragging, { passive: false });
  document.addEventListener("touchend", dragEnd);
}

// ===============================
// ドラッグ中の処理
// ===============================
function dragging(e) {
  if (!currentDrag) return; // ドラッグ中でなければ何もしない
  e.preventDefault(); // スクロールやズームを防止

  const cursor = getCursorPosition(e); // 現在のカーソル/タッチ位置

  // 要素の左上座標を更新
  // shiftX, shiftY でカーソルと要素の位置差を維持
  currentDrag.style.left = cursor.x - shiftX + "px";
  currentDrag.style.top  = cursor.y - shiftY + "px";
}

// ===============================
// ドラッグ終了処理
// ===============================
function dragEnd() {
  // イベントリスナーを解除
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);

  checkPlacement(); // 皿に置かれているか判定
  currentDrag = null; // ドラッグ中の要素をリセット
}

// ===============================
// 当たり判定（皿の上に文字が置かれているか）
// 厳しめ判定：文字全体が皿内に収まる
// ===============================
function checkPlacement() {
  const plate = document.querySelector('.plate');
  const plateRect = plate.getBoundingClientRect(); // 皿の座標とサイズ取得

  const charA = document.getElementById('charA').getBoundingClientRect();
  const charG = document.getElementById('charG').getBoundingClientRect();

  function isOnPlate(charRect) {
    const margin = 5; // 端ギリギリ防止の余白
    // 文字の四隅を皿座標に換算
    const left   = charRect.left - plateRect.left;
    const right  = left + charRect.width;
    const top    = charRect.top - plateRect.top;
    const bottom = top + charRect.height;

    // 文字全体が皿内に収まっていれば true
    return left >= margin &&
           right <= plateRect.width - margin &&
           top >= margin &&
           bottom <= plateRect.height - margin;
  }

  // 両方の文字が皿内にあればクリア
  if (isOnPlate(charA) && isOnPlate(charG)) {
    document.querySelector('.result').textContent = "クリア！ あ + がり = あがり";
  } else {
    document.querySelector('.result').textContent = "";
  }
}
