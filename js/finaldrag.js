let currentDrag = null;
let shiftX = 0;
let shiftY = 0;

function getCursorPosition(event) {
  if (event.touches) {
    return { x: event.touches[0].pageX, y: event.touches[0].pageY };
  }
  return { x: event.pageX, y: event.pageY };
}

// ドラッグイベントを初期化（PCとスマホ共通）
document.querySelectorAll(".draggable").forEach(elem => {
  // PC
  elem.addEventListener("mousedown", dragStart);
  // スマホ
  elem.addEventListener("touchstart", dragStart, { passive: false });
});

function dragStart(e) {
  e.preventDefault();
  currentDrag = e.currentTarget;

  const cursor = getCursorPosition(e);
  const rect = currentDrag.getBoundingClientRect();

  shiftX = cursor.x - rect.left;
  shiftY = cursor.y - rect.top;

  // PC
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);
  // スマホ
  document.addEventListener("touchmove", dragging, { passive: false });
  document.addEventListener("touchend", dragEnd);
}

function dragging(e) {
  if (!currentDrag) return;
  e.preventDefault();
  const cursor = getCursorPosition(e);

  currentDrag.style.left = cursor.x - shiftX + "px";
  currentDrag.style.top  = cursor.y - shiftY + "px";
}

function dragEnd() {
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);

  checkPlacement();
  currentDrag = null;
}

// 厳しめ判定
function checkPlacement() {
  const plate = document.querySelector('.plate');
  const plateRect = plate.getBoundingClientRect();

  const charA = document.getElementById('charA').getBoundingClientRect();
  const charG = document.getElementById('charG').getBoundingClientRect();

  function isOnPlate(charRect) {
    const margin = 5;
    const left   = charRect.left - plateRect.left;
    const right  = left + charRect.width;
    const top    = charRect.top - plateRect.top;
    const bottom = top + charRect.height;

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
