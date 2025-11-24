let currentDrag = null;
let shiftX = 0;
let shiftY = 0;

// 要素からカーソルのズレを取る（もっと正確な版）
function getCursorPosition(event) {
  if (event.touches) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  }
  return {
    x: event.pageX,
    y: event.pageY
  };
}

document.querySelectorAll(".draggable").forEach(elem => {
  elem.addEventListener("mousedown", dragStart);
  elem.addEventListener("touchstart", dragStart);
});

function dragStart(e) {
  e.preventDefault();

  currentDrag = e.target;
  const cursor = getCursorPosition(e);

  // 要素の左上座標との差分（これを保持するとズレなくなる）
  shiftX = cursor.x - currentDrag.offsetLeft;
  shiftY = cursor.y - currentDrag.offsetTop;

  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);

  document.addEventListener("touchmove", dragging);
  document.addEventListener("touchend", dragEnd);
}

function dragging(e) {
  if (!currentDrag) return;
  e.preventDefault();

  const cursor = getCursorPosition(e);

  // 左上に持ってくる、ズレゼロ
  currentDrag.style.left = cursor.x - shiftX + "px";
  currentDrag.style.top = cursor.y - shiftY + "px";
}

function dragEnd() {
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);

  checkPlacement();
  currentDrag = null;
}


// 厳しめ判定（文字全体が皿内に収まるか）
function checkPlacement() {
  const plate = document.querySelector('.plate');
  const plateRect = plate.getBoundingClientRect();

  const charA = document.getElementById('charA').getBoundingClientRect();
  const charG = document.getElementById('charG').getBoundingClientRect();

 function isOnPlate(charRect) {
  // 皿の位置とサイズ
  const plateRect = document.querySelector('.plate').getBoundingClientRect();

  // 左右と上下の余白を個別に設定
  const marginLeft   = 40;
  const marginRight  = 40;
  const marginTop    = 40;
  const marginBottom = 77;

  // 文字の位置を皿基準に変換
  const left   = charRect.left - plateRect.left;
  const right  = left + charRect.width;
  const top    = charRect.top - plateRect.top;
  const bottom = top + charRect.height;

  // 判定
  return left >= marginLeft &&
         right <= plateRect.width - marginRight &&
         top >= marginTop &&
         bottom <= plateRect.height - marginBottom;
}

  if (isOnPlate(charA) && isOnPlate(charG)) {

  // ① クリア画像を表示
  const result = document.querySelector('.result');
  result.innerHTML = '<img src="img/q4_correct.png" class="clear-img">';

  // ② アニメーションしたければCSSで対応可能

  // ③ 2秒後にページ遷移
  setTimeout(() => {
    window.location.href = "nextpage.html"; // ← 遷移先に変更
  }, 2000);
}


// ---- スマホ操作 ----
    const drag = document.getElementById("charA");

drag.addEventListener("touchstart", startDrag, { passive: false });
drag.addEventListener("touchmove", onDrag, { passive: false });
drag.addEventListener("touchend", endDrag);

function startDrag(e) {
  e.preventDefault(); // これが超重要
  // タッチ開始処理
}

function onDrag(e) {
  e.preventDefault(); // スクロール防止
  const touch = e.touches[0];
  drag.style.left = touch.pageX + "px";
  drag.style.top  = touch.pageY + "px";
}

  } else {
    document.querySelector('.result').textContent = "";
  }
}


function createCard(text) {
  const card = document.createElement("div");
  card.className = "draggable";
  card.textContent = text;

  // ★ 文字数で形を変える
  if (text.length === 1) {
    // 1文字 → 正方形
    card.style.width = "80px";
    card.style.height = "80px";
  } else if (text.length >= 2 && text.length <= 3) {
    // 2〜3文字 → 横長
    card.style.height = "80px";
    card.style.width = (text.length * 60) + "px";  
    // 例：
    // 2文字→120px
    // 3文字→180px
  } else {
    // 4文字以上 → 自動調整（必要なら変更）
    card.style.height = "80px";
    card.style.width = (text.length * 50) + "px";
  }

  document.body.appendChild(card);
  return card;
}


