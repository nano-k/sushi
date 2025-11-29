let currentDrag = null;
let shiftX = 0;
let shiftY = 0;

// --------------------------------------
// カーソル位置取得（PC + スマホ両対応）
// --------------------------------------
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

// --------------------------------------
// ドラッグ開始
// --------------------------------------
document.querySelectorAll(".draggable").forEach(elem => {
  elem.addEventListener("mousedown", dragStart);
  elem.addEventListener("touchstart", dragStart, { passive: false });
});

function dragStart(e) {
  e.preventDefault();

  currentDrag = e.target;
  const cursor = getCursorPosition(e);

  shiftX = cursor.x - currentDrag.offsetLeft;
  shiftY = cursor.y - currentDrag.offsetTop;

  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);

  document.addEventListener("touchmove", dragging, { passive: false });
  document.addEventListener("touchend", dragEnd);
}

// --------------------------------------
// ドラッグ中
// --------------------------------------
function dragging(e) {
  if (!currentDrag) return;
  e.preventDefault();

  const cursor = getCursorPosition(e);

  currentDrag.style.left = cursor.x - shiftX + "px";
  currentDrag.style.top = cursor.y - shiftY + "px";
}

// --------------------------------------
// ドラッグ終了
// --------------------------------------
function dragEnd() {
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);

  checkPlacement();
  currentDrag = null;
}

// --------------------------------------
// 皿の判定
// --------------------------------------
function checkPlacement() {
  const charA = document.getElementById('charA').getBoundingClientRect();
  const charG = document.getElementById('charG').getBoundingClientRect();

  function isOnPlate(charRect) {
    const plateRect = document.querySelector('.plate').getBoundingClientRect();

    const marginLeft   = 40;
    const marginRight  = 40;
    const marginTop    = 40;
    const marginBottom = 77;

    const left   = charRect.left - plateRect.left;
    const right  = left + charRect.width;
    const top    = charRect.top - plateRect.top;
    const bottom = top + charRect.height;

    return left >= marginLeft &&
           right <= plateRect.width - marginRight &&
           top >= marginTop &&
           bottom <= plateRect.height - marginBottom;
  }

  // ----- クリア判定 -----
  if (isOnPlate(charA) && isOnPlate(charG)) {
    
    const result = document.querySelector('.result');
    result.innerHTML = '<img src="img/agari_correct.png" class="clear-img">';

    // 2秒後にページ遷移
    setTimeout(() => {
      window.location.href = "clear.html";
    }, 2000);

  } else {
    document.querySelector('.result').textContent = "";
  }
}


// --------------------------------------
// カード生成（正方形 / 長方形）
// --------------------------------------
function createCard(text) {
  const card = document.createElement("div");
  card.className = "draggable";
  card.textContent = text;

  const len = [...text].length;

  if (len === 1) {
    card.style.width = "80px";
    card.style.height = "80px";
  } else if (len <= 3) {
    card.style.height = "80px";
    card.style.width = (len * 60) + "px";
  } else {
    card.style.height = "80px";
    card.style.width = (len * 50) + "px";
  }

  document.body.appendChild(card);
  return card;
}


// 戻るトグル
$(document).ready(function() {
  $("#pastBtn").click(function(e) {
    e.preventDefault();
    $("#pastMenu").slideToggle(200);
  });
});
