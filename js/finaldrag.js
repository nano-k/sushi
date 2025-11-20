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


// ---- 皿判定（そのままでOK） ----
function checkPlacement() {
  const plate = document.querySelector('.plate');
  const plateRect = plate.getBoundingClientRect();

  const charA = document.getElementById('charA').getBoundingClientRect();
  const charG = document.getElementById('charG').getBoundingClientRect();

  function isOnPlate(charRect){
    const x = charRect.left + charRect.width/2 - plateRect.left;
    const y = charRect.top + charRect.height/2 - plateRect.top;
    return x > 0 && x < plateRect.width && y > 0 && y < plateRect.height;
  }

  if(isOnPlate(charA) && isOnPlate(charG)){
    document.querySelector('.result').textContent = "クリア！ あ + がり = あがり";
  } else {
    document.querySelector('.result').textContent = "";
  }
}
