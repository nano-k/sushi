document.addEventListener("DOMContentLoaded", () => {
  const itemA = document.getElementById("itemA");
  const itemG = document.getElementById("itemG");
  const plate = document.querySelector(".plate-container");
  const correctMessage = document.getElementById("correctMessage");

  let dragTarget = null;
  let offsetX, offsetY;

  // ドラッグ開始
  [itemA, itemG].forEach(item => {
    item.addEventListener("mousedown", startDrag);
    item.addEventListener("touchstart", startDrag, {passive:false});
  });

  function startDrag(e) {
    e.preventDefault();
    dragTarget = e.target;

    const rect = dragTarget.getBoundingClientRect();
    const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", drop);
    document.addEventListener("touchmove", drag, {passive:false});
    document.addEventListener("touchend", drop);
  }

  function drag(e) {
    if (!dragTarget) return;

    const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

    dragTarget.style.position = "absolute";
    dragTarget.style.left = (clientX - offsetX) + "px";
    dragTarget.style.top = (clientY - offsetY) + "px";
    dragTarget.style.zIndex = 1000;
  }

  function drop() {
    if (!dragTarget) return;

    const plateRect = plate.getBoundingClientRect();
    const itemRect = dragTarget.getBoundingClientRect();

    const x = itemRect.left + itemRect.width / 2 - plateRect.left;
    const y = itemRect.top + itemRect.height / 2 - plateRect.top;

    if (x > 50 && x < 250 && y > 50 && y < 150) {
      dragTarget.dataset.onPlate = "true";
    } else {
      dragTarget.dataset.onPlate = "false";
    }

    dragTarget = null;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", drop);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", drop);

    checkClear();
  }

  function checkClear() {
    if (itemA.dataset.onPlate === "true" && itemG.dataset.onPlate === "true") {
      correctMessage.classList.remove("hidden");
    }
  }

  // ブラウザバック時の再表示防止
  window.addEventListener("pageshow", function(event) {
    correctMessage.classList.add("hidden");
    [itemA, itemG].forEach(item => item.dataset.onPlate = "false");
  });
});
