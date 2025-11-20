// ドラッグ初期化
document.querySelectorAll('.draggable').forEach(elem => {
  elem.addEventListener('mousedown', dragStart);
  elem.addEventListener('touchstart', dragStart);
});

let currentDrag = null;
let offsetX = 0, offsetY = 0;

function dragStart(e) {
  currentDrag = e.target;
  const rect = currentDrag.getBoundingClientRect();

  if (e.type === 'mousedown') {
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragEnd);
  } else {
    const touch = e.touches[0];
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    document.addEventListener('touchmove', dragging);
    document.addEventListener('touchend', dragEnd);
  }
}

function dragging(e) {
  e.preventDefault();
  let clientX = e.clientX || e.touches[0].clientX;
  let clientY = e.clientY || e.touches[0].clientY;
  currentDrag.style.left = (clientX - offsetX) + 'px';
  currentDrag.style.top = (clientY - offsetY) + 'px';
}

function dragEnd(e) {
  if (e.type === 'mouseup') {
    document.removeEventListener('mousemove', dragging);
    document.removeEventListener('mouseup', dragEnd);
  } else {
    document.removeEventListener('touchmove', dragging);
    document.removeEventListener('touchend', dragEnd);
  }
  checkPlacement();
  currentDrag = null;
}

// 皿上に文字が揃ったらクリア
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
    // 次ページ遷移
    // window.location.href = "next.html";
  } else {
    document.querySelector('.result').textContent = "";
  }
}
